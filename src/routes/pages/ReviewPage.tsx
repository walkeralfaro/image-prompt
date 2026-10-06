import { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { stepsData } from '../../data/stepsData';
import { usePromptStore } from '../../store/usePromptStore';
import { CustomInput } from '../../components/questionnaire/CustomInput';
import { ProjectSwitcher } from '../../components/projects/ProjectSwitcher';
import { PaletteBuilder } from '../../components/questionnaire/PaletteBuilder';
import { TextListInput } from '../../components/questionnaire/TextListInput';
import { TopicMultiSelect } from '../../components/questionnaire/TopicMultiSelect';
import { generateOptimizedPrompt } from '../../utils/formatPrompt';

export function ReviewPage() {
  const store = usePromptStore();
  const { confirmedSteps, answers, customAnswers, textList, noText, selectedTopics } = store;
  const confirmedCount = confirmedSteps.filter(Boolean).length;

  const prompt = useMemo(
    () =>
      generateOptimizedPrompt({ answers, customAnswers, textList, noText, selectedTopics }),
    [answers, customAnswers, textList, noText, selectedTopics],
  );
  const lines = useMemo(() => prompt.split('\n'), [prompt]);

  if (confirmedCount < 7) {
    const pending = stepsData
      .filter((_, i) => !confirmedSteps[i])
      .map((s) => `${s.id} · ${s.title}`);
    return (
      <div className="space-y-4">
        <Navigate to="/cuestionario" replace />
        <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-5 text-sm">
          <p className="font-bold text-yellow-200">
            Faltan {7 - confirmedCount} pasos por confirmar: {pending.join(', ')}
          </p>
          <p className="mt-1 text-yellow-200/80">
            Te hemos devuelto al cuestionario. Confirma cada paso para desbloquear la revisión.
          </p>
          <Link to="/cuestionario" className="mt-3 inline-block rounded-xl bg-app-accent px-4 py-2 text-white">
            Volver al cuestionario
          </Link>
        </div>
      </div>
    );
  }

  const editSimple = (stepIdx: number, v: string) => {
    const field = stepsData[stepIdx].field;
    store.setAnswer(field, 'custom');
    store.setCustomAnswer(field, v);
    store.unconfirmStep(stepIdx);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Paso 8 · Revisión</h1>
        <p className="text-sm text-app-muted">
          Edita cualquier valor. Editar invalida la confirmación de ese paso: vuelve al
          cuestionario a reconfirmarlo o confirma de nuevo desde aquí.
        </p>
      </div>

      <ProjectSwitcher />

      <CustomInput
        label="Nombre del proyecto"
        value={store.projectName}
        onChange={store.setProjectName}
        placeholder="Mi primer proyecto"
      />

      <div className="rounded-2xl border border-app-border bg-app-card p-4">
        <h2 className="mb-2 text-sm font-bold text-app-muted">Vista previa · 7 líneas</h2>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">{prompt}</pre>
      </div>

      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => {
          const s = stepsData[i];
          const val =
            answers[s.field] === 'custom' ? customAnswers[s.field] : answers[s.field];
          const done = confirmedSteps[i];
          return (
            <div key={s.id} className="rounded-2xl border border-app-border bg-app-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-bold">
                  Línea {s.id} · {s.title}{' '}
                  <span className={done ? 'text-green-400' : 'text-yellow-300'}>
                    {done ? '✓ confirmado' : '○ pendiente de confirmar'}
                  </span>
                </h3>
                {!done && (
                  <button
                    type="button"
                    onClick={() => store.confirmStep(i)}
                    className="rounded-lg bg-app-accent px-3 py-1 text-xs font-bold text-white"
                  >
                    Confirmar de nuevo
                  </button>
                )}
              </div>
              <input
                type="text"
                value={val}
                onChange={(e) => editSimple(i, e.target.value)}
                className="w-full rounded-xl border border-app-border bg-app-bg px-3 py-2 text-sm outline-none focus:border-app-accent"
              />
              <p className="mt-1 text-xs text-app-muted">Actual: {lines[i]}</p>
            </div>
          );
        })}

        <div className="rounded-2xl border border-app-border bg-app-card p-4">
          <h3 className="mb-2 text-sm font-bold">
            Línea 5 · Texto exacto{' '}
            <span className={confirmedSteps[4] ? 'text-green-400' : 'text-yellow-300'}>
              {confirmedSteps[4] ? '✓ confirmado' : '○ pendiente de confirmar'}
            </span>
          </h3>
          <div
            onBlurCapture={() => {
              if (confirmedSteps[4]) store.unconfirmStep(4);
            }}
          >
            <TextListInput />
          </div>
          <p className="mt-1 text-xs text-app-muted">Actual: {lines[4]}</p>
          {!confirmedSteps[4] && (
            <button
              type="button"
              onClick={() => store.confirmStep(4)}
              className="mt-2 rounded-lg bg-app-accent px-3 py-1 text-xs font-bold text-white"
            >
              Confirmar de nuevo
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-app-border bg-app-card p-4">
          <h3 className="mb-2 text-sm font-bold">
            Línea 6 · Tipografía y paleta{' '}
            <span className={confirmedSteps[5] ? 'text-green-400' : 'text-yellow-300'}>
              {confirmedSteps[5] ? '✓ confirmado' : '○ pendiente de confirmar'}
            </span>
          </h3>
          <div
            onBlurCapture={() => {
              if (confirmedSteps[5]) store.unconfirmStep(5);
            }}
            onClickCapture={() => {
              if (confirmedSteps[5]) store.unconfirmStep(5);
            }}
          >
            <PaletteBuilder />
          </div>
          <p className="mt-1 text-xs text-app-muted">Actual: {lines[5]}</p>
          {!confirmedSteps[5] && (
            <button
              type="button"
              onClick={() => store.confirmStep(5)}
              className="mt-2 rounded-lg bg-app-accent px-3 py-1 text-xs font-bold text-white"
            >
              Confirmar de nuevo
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-app-border bg-app-card p-4">
          <h3 className="mb-2 text-sm font-bold">
            Línea 7 · Evita{' '}
            <span className={confirmedSteps[6] ? 'text-green-400' : 'text-yellow-300'}>
              {confirmedSteps[6] ? '✓ confirmado' : '○ pendiente de confirmar'}
            </span>
          </h3>
          <div
            onBlurCapture={() => {
              if (confirmedSteps[6]) store.unconfirmStep(6);
            }}
            onClickCapture={() => {
              if (confirmedSteps[6]) store.unconfirmStep(6);
            }}
          >
            <TopicMultiSelect />
          </div>
          <p className="mt-1 text-xs text-app-muted">Actual: {lines[6]}</p>
          {!confirmedSteps[6] && (
            <button
              type="button"
              onClick={() => store.confirmStep(6)}
              className="mt-2 rounded-lg bg-app-accent px-3 py-1 text-xs font-bold text-white"
            >
              Confirmar de nuevo
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to="/cuestionario"
          className="rounded-xl border border-app-border px-5 py-2.5 text-sm hover:border-app-accent"
        >
          ← Volver al cuestionario
        </Link>
        {confirmedSteps.every(Boolean) ? (
          <Link
            to="/resultado"
            className="rounded-xl bg-app-accent px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
          >
            Ver resultado →
          </Link>
        ) : (
          <span className="rounded-xl border border-yellow-500/40 px-5 py-2.5 text-sm text-yellow-200">
            Reconfirma los pasos editados para ver el resultado
          </span>
        )}
      </div>
    </div>
  );
}
