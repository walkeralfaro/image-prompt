import { cn } from '../../utils/cn';

export function ProgressTracker({
  current,
  confirmed,
}: {
  current: number;
  confirmed: boolean[];
}) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between text-xs text-app-muted">
        <span>
          Paso {current}/7 · {confirmed.filter(Boolean).length}/7 confirmados
        </span>
      </div>
      <div className="flex gap-1.5">
        {confirmed.map((done, i) => (
          <div
            key={i}
            className={cn(
              'h-2 flex-1 rounded-full',
              done
                ? 'bg-app-accent'
                : i + 1 === current
                  ? 'bg-app-accent/40'
                  : 'bg-app-border',
            )}
          />
        ))}
      </div>
    </div>
  );
}
