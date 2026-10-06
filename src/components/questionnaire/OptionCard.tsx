import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ExampleContent } from '../../data/stepsData';
import { RecommendationTooltip } from './RecommendationTooltip';

export function OptionCard({
  label,
  description,
  example,
  exampleImage,
  selected,
  onSelect,
}: {
  label: string;
  description?: string;
  example?: string | ExampleContent;
  exampleImage?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition',
        selected
          ? 'border-app-accent bg-app-accent/15 shadow-[0_0_0_1px_var(--color-app-accent)]'
          : 'border-app-border bg-app-bg hover:border-app-accent/60',
      )}
    >
      <span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="block">{label}</span>
          {example && <RecommendationTooltip example={example} exampleImage={exampleImage} />}
        </span>
        {description && (
          <span className="mt-0.5 block text-xs text-app-muted">{description}</span>
        )}
      </span>
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
          selected ? 'border-app-accent bg-app-accent text-white' : 'border-app-border',
        )}
      >
        {selected && <Check className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}
