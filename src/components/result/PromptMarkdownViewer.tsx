export function PromptMarkdownViewer({ promptText }: { promptText: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-app-border bg-app-bg dark:bg-black/40">
      <div className="border-b border-app-border px-4 py-2 text-xs text-app-muted">
        prompt · texto plano de 7 líneas
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed text-app-cream">
        {promptText}
      </pre>
    </div>
  );
}
