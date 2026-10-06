import { useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { stepsData, type StepField } from '../../data/stepsData';
import { usePromptStore } from '../../store/usePromptStore';
import { CustomInput } from '../../components/questionnaire/CustomInput';
import { EmptyAdjectiveWarning } from '../../components/questionnaire/EmptyAdjectiveWarning';
import { OptionCard } from '../../components/questionnaire/OptionCard';
import { PaletteBuilder } from '../../components/questionnaire/PaletteBuilder';
import { ProgressTracker } from '../../components/questionnaire/ProgressTracker';
import { StepCard } from '../../components/questionnaire/StepCard';
import { ProjectSwitcher } from '../../components/projects/ProjectSwitcher';
import { TextListInput } from '../../components/questionnaire/TextListInput';
import { TopicMultiSelect } from '../../components/questionnaire/TopicMultiSelect';
import { cn } from '../../utils/cn';

function currentValue(
  field: StepField,
  answers: Record<StepField, string>,
  customAnswers: Record<StepField, string>,
): string {
  if (field === 'textoExacto' || field === 'evita') return '';
  if (answers[field] === 'custom') return customAnswers[field];
  return answers[field];
}

export function QuestionnairePage() {
  const store = usePromptStore();
  const { currentStep, setStep, nextStep, prevStep, answers, customAnswers, confirmedSteps } =
    store;
  const step = stepsData[currentStep - 1];

  const freeText = useMemo(() => {
    if (step.id === 5) return store.textList.join(', ');
    if (step.id === 7)
      return answers.evita === 'custom' ? customAnswers.evita : answers.evita;
    return currentValue(step.field, answers, customAnswers);
  }, [step, answers, customAnswers, store.textList]);

  const renderStepBody = () => {
    if (step.id === 5) return <TextListInput />;
    if (step.id === 6) return <PaletteBuilder />;
    if (step.id === 7) return <TopicMultiSelect />;
    return (
      <>
        {step.options.map((o) => (
          <OptionCard
            key={o.value}
            label={o.label}
            description={o.description}
            example={o.example}
            exampleImage={o.exampleImage}
            selected={answers[step.field] === o.value}
            onSelect={() => store.setAnswer(step.field, o.value)}
          />
        ))}
        <OptionCard
          label="Personalizada"
          description="Escribe tu propio valor"
          selected={answers[step.field] === 'custom'}
          onSelect={() => store.setAnswer(step.field, 'custom')}
        />
        {answers[step.field] === 'custom' && (
          <CustomInput
            label={`Tu ${step.title.toLowerCase()} personalizado`}
            value={customAnswers[step.field]}
            onChange={(v) => store.setCustomAnswer(step.field, v)}
            placeholder={`Ej. ${step.options[0]?.label ?? '...'}`}
          />
        )}
      </>
    );
  };

  const confirmed = confirmedSteps[currentStep - 1];
  const allConfirmed = confirmedSteps.every(Boolean);
  const pendingCount = confirmedSteps.filter((c) => !c).length;
  const pendingSteps = confirmedSteps
    .map((c, i) => (!c ? i + 1 : null))
    .filter((n): n is number => n !== null);
  const ctaEnabled = currentStep === 7 && allConfirmed;

  return (
    <div className="space-y-4">
      <ProjectSwitcher />
      <ProgressTracker current={currentStep} confirmed={confirmedSteps} />

      <div className="flex flex-wrap gap-1.5">
        {stepsData.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(s.id)}
            className={cn(
              'rounded-lg border px-2.5 py-1 text-xs',
              s.id === currentStep
                ? 'border-app-accent bg-app-accent/20 font-bold'
                : confirmedSteps[s.id - 1]
                  ? 'border-app-accent/50 text-app-cream'
                  : 'border-app-border text-app-muted hover:border-app-accent/50',
            )}
          >
            {s.id} · {s.title}
            {confirmedSteps[s.id - 1] ? ' ✓' : ''}
          </button>
        ))}
      </div>

      <StepCard title={`Paso ${step.id}: ${step.title}`} subtitle={step.subtitle}>
        {renderStepBody()}
        <EmptyAdjectiveWarning text={freeText} />
      </StepCard>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="rounded-xl border border-app-border px-4 py-2 text-sm disabled:opacity-40 hover:border-app-accent"
          >
            ← Anterior
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={currentStep === 7}
            className="rounded-xl border border-app-border px-4 py-2 text-sm disabled:opacity-40 hover:border-app-accent"
          >
            Siguiente →
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            confirmed
              ? store.unconfirmStep(currentStep - 1)
              : store.confirmStep(currentStep - 1)
          }
          aria-pressed={confirmed}
          title={confirmed ? 'Desconfirmar paso' : 'Confirmar paso'}
          className={cn(
            'flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-bold text-white',
            confirmed ? 'bg-green-600 hover:opacity-90' : 'bg-app-accent hover:opacity-90',
          )}
        >
          <Check className="h-4 w-4" />
          {confirmed ? 'Desconfirmar paso' : 'Confirmar paso'}
        </button>
      </div>

      <div className="rounded-2xl border border-app-border p-4">
        {ctaEnabled ? (
          <Link
            to="/resultado"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-app-accent px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
          >
            Ver prompt resultante <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <div className="space-y-1.5">
            <button
              type="button"
              disabled
              aria-disabled="true"
              title={
                pendingCount > 0
                  ? `Te faltan ${pendingCount}: pasos ${pendingSteps.join(', ')}`
                  : 'Llega al paso 7 para ver el resultado'
              }
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-app-border px-5 py-2.5 text-sm font-bold opacity-50"
            >
              Ver prompt resultante <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-app-muted">
              {pendingCount > 0
                ? `Te faltan ${pendingCount}: pasos ${pendingSteps.join(', ')} por confirmar`
                : 'Llega al paso 7 para ver el resultado'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
