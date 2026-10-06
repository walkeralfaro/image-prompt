import { Link, NavLink } from 'react-router-dom';
import { Images, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { cn } from '../../utils/cn';

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn('hover:text-app-cream', isActive && 'font-bold text-app-accent');

export function Header() {
  const resolved = useThemeStore((s) => s.resolved);
  const toggle = useThemeStore((s) => s.toggle);
  const isDark = resolved === 'dark';

  return (
    <header className="border-b border-app-border bg-app-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-app-accent">
            <Images className="h-5 w-5 text-white" />
          </span>
          <span className="font-bold tracking-tight text-app-cream">
            Image Prompt <span className="text-app-accent">· 7 líneas</span>
          </span>
        </Link>
        <nav aria-label="Navegación principal" className="flex items-center gap-3 text-sm text-app-muted sm:gap-4">
          <NavLink className={({ isActive }) => cn('hidden min-[420px]:inline', navClass({ isActive }))} to="/" end>Inicio</NavLink>
          <NavLink className={navClass} to="/cuestionario">Cuestionario</NavLink>
          <NavLink className={({ isActive }) => cn('hidden sm:inline', navClass({ isActive }))} to="/revision">Revisión</NavLink>
          <NavLink className={({ isActive }) => cn('hidden sm:inline', navClass({ isActive }))} to="/resultado">Resultado</NavLink>
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            aria-pressed={isDark}
            title={isDark ? 'Tema oscuro (cambiar a claro)' : 'Tema claro (cambiar a oscuro)'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-app-border text-app-muted outline-none transition hover:border-app-accent hover:text-app-cream focus-visible:ring-2 focus-visible:ring-app-accent"
          >
            {isDark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
          </button>
        </nav>
      </div>
    </header>
  );
}
