import { useCallback, useState } from 'react';

export function useCopyToClipboard(): {
  copied: boolean;
  error: string | null;
  copy: (text: string) => Promise<boolean>;
} {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    setError(null);
    try {
      if (navigator.clipboard && window.isSecureContext !== false) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
        return true;
      }
      throw new Error('clipboard-unavailable');
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (!ok) throw new Error('exec-failed');
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
        return true;
      } catch {
        setCopied(false);
        setError('No se pudo copiar. Selecciona el texto manualmente.');
        return false;
      }
    }
  }, []);

  return { copied, error, copy };
}
