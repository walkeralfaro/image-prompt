import { Link } from 'react-router-dom';
import { ArrowRight, ListChecks, MousePointerClick, Sparkles } from 'lucide-react';
import { HistoryPanel } from '../../components/history/HistoryPanel';
import { ProjectSwitcher } from '../../components/projects/ProjectSwitcher';

export function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-app-border bg-app-card p-6 md:p-8">
        <p className="mb-2 inline-block rounded-full bg-app-accent/20 px-3 py-1 text-xs font-medium text-app-accent">
          Método · 7 líneas estrictas
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Generador de prompts <span className="bg-app-accent bg-clip-text text-transparent">de 7 líneas</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-app-muted md:text-base">
          Responde 7 pasos guiados (formato, qué es, tema, estilo, texto exacto, tipografía y
          evita), confirma cada paso, revisa y copia un prompt sin “cara de IA”: sin brochazos,
          sin pan de oro, sin lemas inventados.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/cuestionario"
            className="flex items-center gap-2 rounded-xl bg-app-accent bg-app-brand px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
          >
            Empezar cuestionario <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/revision"
            className="flex items-center gap-2 rounded-xl border border-app-border px-5 py-2.5 text-sm hover:border-app-accent"
          >
            <ListChecks className="h-4 w-4" /> Ir a revisión
          </Link>
        </div>
        <div className="mt-6 grid gap-3 text-xs text-app-muted md:grid-cols-3">
          <div className="flex items-start gap-2 rounded-xl border border-app-border bg-app-bg p-3">
            <MousePointerClick className="h-4 w-4 shrink-0 text-app-accent" />
            7 pasos con predefinidas + personalizada y confirmación explícita.
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-app-border bg-app-bg p-3">
            <Sparkles className="h-4 w-4 shrink-0 text-app-accent" />
            Sufijo “y ningún otro texto” y antiguía fija automáticos.
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-app-border bg-app-bg p-3">
            <ListChecks className="h-4 w-4 shrink-0 text-app-accent" />
            Revisión editable, resultado copiable y descargable en .md
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold">Tus proyectos</h2>
        <ProjectSwitcher />
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold">Tu historial local</h2>
        <HistoryPanel />
      </section>
    </div>
  );
}
