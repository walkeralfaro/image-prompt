import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export function CopyButton({ text, label = 'Copiar prompt' }: { text: string; label?: string }) {
  const { copied, error, copy } = useCopyToClipboard();
  return (
    <div>
      <button
        type="button"
        onClick={() => void copy(text)}
        className="flex items-center gap-2 rounded-xl bg-app-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? '¡Copiado!' : label}
      </button>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {copied && <p className="mt-1 text-xs text-green-400">Prompt copiado al portapapeles.</p>}
    </div>
  );
}
