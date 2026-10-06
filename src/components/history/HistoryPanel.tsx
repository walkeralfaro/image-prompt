import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Pencil, Trash2 } from 'lucide-react';
import { usePromptStore } from '../../store/usePromptStore';
import { useProjectsStore } from '../../store/useProjectsStore';

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function HistoryPanel({ onLoad }: { onLoad?: () => void }) {
  const history = usePromptStore((s) => s.history);
  const deleteRecord = usePromptStore((s) => s.deleteRecord);
  const clearHistory = usePromptStore((s) => s.clearHistory);
  const loadRecord = usePromptStore((s) => s.loadRecord);
  const showAllHistory = usePromptStore((s) => s.showAllHistory);
  const setShowAllHistory = usePromptStore((s) => s.setShowAllHistory);
  const activeProjectId = useProjectsStore((s) => s.activeProjectId);
  const projects = useProjectsStore((s) => s.projects);
  const setActive = useProjectsStore((s) => s.setActive);
  const [confirmClear, setConfirmClear] = useState(false);
  const navigate = useNavigate();

  const visible = showAllHistory || !activeProjectId
    ? history
    : history.filter((r) => !r.projectId || r.projectId === activeProjectId);

  const projectNameOf = (projectId: string | null) =>
    projects.find((p) => p.id === projectId)?.name;

  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-app-border p-5 text-center text-sm text-app-muted">
        <History className="mx-auto mb-2 h-6 w-6" />
        Aún no hay prompts guardados. Genera tu primer prompt de 7 líneas y pulsa “Guardar en historial”.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold">Historial ({visible.length}/{history.length})</h3>
        <label className="flex items-center gap-1.5 text-xs text-app-muted">
          <input
            type="checkbox"
            checked={showAllHistory}
            onChange={(e) => setShowAllHistory(e.target.checked)}
            className="h-4 w-4 accent-[#8b5cf6]"
          />
          Ver todos los proyectos
        </label>
        {confirmClear ? (
          <span className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                clearHistory(activeProjectId ?? undefined);
                setConfirmClear(false);
              }}
              className="rounded-lg bg-red-600 px-2 py-1 text-white"
            >
              Confirmar vaciado
            </button>
            <button
              type="button"
              onClick={() => setConfirmClear(false)}
              className="rounded-lg border border-app-border px-2 py-1"
            >
              Cancelar
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmClear(true)}
            className="text-xs text-app-muted hover:text-red-400"
          >
            {showAllHistory ? 'Vaciar todo' : 'Vaciar proyecto'}
          </button>
        )}
      </div>
      {visible.length === 0 && (
        <p className="rounded-xl border border-dashed border-app-border p-4 text-center text-xs text-app-muted">
          Sin registros en este proyecto. Activa “Ver todos” o guarda el prompt actual.
        </p>
      )}
      {visible.map((r) => (
        <div
          key={r.id}
          className="rounded-xl border border-app-border bg-app-bg p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{r.projectName}</p>
              <p className="text-xs text-app-muted">
                {fmtDate(r.createdAt)}
                {r.projectId && projectNameOf(r.projectId) && r.projectName !== projectNameOf(r.projectId)
                  ? ` · ${projectNameOf(r.projectId)}`
                  : ''}
                {r.promptEnText ? ' · EN ✓' : ''}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                title="Cargar para editar"
                onClick={() => {
                  if (r.projectId) {
                    const ps = usePromptStore.getState();
                    if (activeProjectId) ps.saveDraftForProject(activeProjectId);
                    setActive(r.projectId);
                    ps.loadDraftForProject(r.projectId);
                  }
                  loadRecord(r.id);
                  onLoad?.();
                  navigate('/cuestionario');
                }}
                className="rounded-lg border border-app-border p-1.5 hover:border-app-accent"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="Borrar"
                onClick={() => {
                  if (window.confirm(`¿Borrar "${r.projectName}" del historial?`)) {
                    deleteRecord(r.id);
                  }
                }}
                className="rounded-lg border border-app-border p-1.5 hover:border-red-500 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-xs text-app-muted">{r.promptText.split('\n')[0]}…</p>
        </div>
      ))}
    </div>
  );
}
