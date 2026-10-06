import { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { HistoryPanel } from '../../components/history/HistoryPanel';
import { CopyButton } from '../../components/result/CopyButton';
import { DownloadMdButton } from '../../components/result/DownloadMdButton';
import { PromptMarkdownViewer } from '../../components/result/PromptMarkdownViewer';
import { CustomInput } from '../../components/questionnaire/CustomInput';
import { ProjectSwitcher } from '../../components/projects/ProjectSwitcher';
import { usePromptStore } from '../../store/usePromptStore';
import { useProjectsStore } from '../../store/useProjectsStore';
import { generateMarkdownDocument, generateOptimizedPrompt } from '../../utils/formatPrompt';
import { buildOptimizedEn, type OptimizedTarget } from '../../utils/formatPromptEn';
import { downloadTextFile } from '../../utils/cn';

export function ResultPage() {
  const store = usePromptStore();
  const activeProjectId = useProjectsStore((s) => s.activeProjectId);
  const { confirmedSteps, answers, customAnswers, textList, noText, selectedTopics } = store;
  const [saved, setSaved] = useState(false);
  const [target, setTarget] = useState<OptimizedTarget>('midjourney');
  const confirmedCount = confirmedSteps.filter(Boolean).length;

  const prompt = useMemo(
    () =>
      generateOptimizedPrompt({ answers, customAnswers, textList, noText, selectedTopics }),
    [answers, customAnswers, textList, noText, selectedTopics],
  );
  const promptEn = useMemo(
    () =>
      buildOptimizedEn({ answers, customAnswers, textList, noText, selectedTopics }, target),
    [answers, customAnswers, textList, noText, selectedTopics, target],
  );
  const projectName =
    store.projectName.trim() === '' ? 'Mi primer proyecto' : store.projectName.trim();

  if (confirmedCount < 7) {
    return (
      <div className="space-y-4">
        <Navigate to="/cuestionario" replace />
        <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-5 text-sm text-yellow-200">
          Completa y confirma los 7 pasos antes de ver el resultado.
          <div className="mt-3">
            <Link to="/cuestionario" className="rounded-xl bg-app-accent px-4 py-2 text-white">
              Volver al cuestionario
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Resultado</h1>
        <p className="text-sm text-app-muted">
          Copia el prompt, descárgalo en Markdown o guárdalo en tu historial local.
        </p>
      </div>

      <ProjectSwitcher />

      <CustomInput
        label="Nombre del proyecto"
        value={store.projectName}
        onChange={store.setProjectName}
        placeholder="Mi primer proyecto"
      />

      <PromptMarkdownViewer promptText={prompt} />

      <div className="flex flex-wrap gap-3">
        <CopyButton text={prompt} />
        <DownloadMdButton promptText={prompt} projectName={projectName} />
        <button
          type="button"
          onClick={() => {
            store.saveToHistory(prompt, promptEn, activeProjectId);
            setSaved(true);
            window.setTimeout(() => setSaved(false), 2500);
          }}
          className="flex items-center gap-2 rounded-xl border border-app-accent px-4 py-2 text-sm hover:bg-app-accent/20"
        >
          <Save className="h-4 w-4" />
          {store.editingId ? 'Guardar cambios' : 'Guardar en historial'}
        </button>
        <button
          type="button"
          onClick={() =>
            downloadTextFile(
              'prompt_cartel_7_lineas.md',
              generateMarkdownDocument(prompt, projectName),
            )
          }
          className="hidden"
          aria-hidden
        />
      </div>
      {saved && (
        <p className="text-xs text-green-400">
          Guardado en el historial {store.editingId ? '' : 'como nuevo registro'}. Persiste tras
          recargar.
        </p>
      )}
      {store.editingId && (
        <p className="text-xs text-app-muted">
          Estás editando un registro existente: al guardar se actualizará el mismo id, sin duplicar.
        </p>
      )}

      <div className="space-y-2 rounded-2xl border border-app-border bg-app-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold">Prompt optimizado (EN)</h2>
          <label className="flex items-center gap-2 text-xs text-app-muted">
            Destino
            <select
              aria-label="Destino del prompt optimizado"
              value={target}
              onChange={(e) => setTarget(e.target.value as OptimizedTarget)}
              className="rounded-lg border border-app-border bg-app-bg px-2 py-1 text-xs outline-none focus:border-app-accent"
            >
              <option value="midjourney">Midjourney</option>
              <option value="dall-e">DALL-E</option>
              <option value="chatgpt-images">ChatGPT Images</option>
            </select>
          </label>
        </div>
        <PromptMarkdownViewer promptText={promptEn} />
        <div className="flex flex-wrap gap-3">
          <CopyButton text={promptEn} label="Copiar prompt EN" />
        </div>
        <p className="text-xs text-app-muted">
          Generado localmente desde el bloque ES. Respeta el modo sin texto y añade parámetros del
          destino elegido.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          to="/revision"
          className="rounded-xl border border-app-border px-5 py-2.5 text-sm hover:border-app-accent"
        >
          ← Revisar
        </Link>
        <Link
          to="/cuestionario"
          className="rounded-xl border border-app-border px-5 py-2.5 text-sm hover:border-app-accent"
        >
          Nuevo cuestionario
        </Link>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-bold">Historial</h2>
        <HistoryPanel />
      </div>
    </div>
  );
}
