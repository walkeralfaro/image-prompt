import { TriangleAlert } from 'lucide-react';
import { containsEmptyAdjective } from '../../data/antiTropesData';

export function EmptyAdjectiveWarning({ text }: { text: string }) {
  const found = containsEmptyAdjective(text);
  if (!found) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-200"
    >
      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      <span>
        Detectado adjetivo vacío “{found}”. Mejor usa un estilo con nombre propio
        (ej. Swiss, Constructivismo, Memphis). Puedes confirmar igualmente.
      </span>
    </div>
  );
}
