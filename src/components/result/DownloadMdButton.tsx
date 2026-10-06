import { Download } from 'lucide-react';
import { downloadTextFile } from '../../utils/cn';
import { generateMarkdownDocument } from '../../utils/formatPrompt';

export function DownloadMdButton({
  promptText,
  projectName,
}: {
  promptText: string;
  projectName: string;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        downloadTextFile(
          'prompt_cartel_7_lineas.md',
          generateMarkdownDocument(promptText, projectName),
        )
      }
      className="flex items-center gap-2 rounded-xl border border-app-accent px-4 py-2 text-sm text-app-cream hover:bg-app-accent/20"
    >
      <Download className="h-4 w-4" /> Descargar Markdown
    </button>
  );
}
