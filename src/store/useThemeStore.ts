import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeChoice = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

function systemTheme(): ResolvedTheme {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
}

function resolveTheme(choice: ThemeChoice): ResolvedTheme {
  return choice === 'system' ? systemTheme() : choice;
}

function applyTheme(resolved: ResolvedTheme): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
}

interface ThemeState {
  theme: ThemeChoice;
  resolved: ResolvedTheme;
  setTheme: (t: ThemeChoice) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolved: typeof window === 'undefined' ? 'dark' : systemTheme(),

      setTheme: (t) => {
        const resolved = resolveTheme(t);
        applyTheme(resolved);
        set({ theme: t, resolved });
      },

      toggle: () => {
        const current = get().resolved;
        const next: ResolvedTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        set({ theme: next, resolved: next });
      },
    }),
    {
      name: 'image-prompt-theme-v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolved = resolveTheme(state.theme);
          applyTheme(resolved);
          state.resolved = resolved;
        } else {
          applyTheme(systemTheme());
        }
      },
    },
  ),
);

export function initTheme(): void {
  try {
    const raw = localStorage.getItem('image-prompt-theme-v1');
    if (raw) {
      const parsed = JSON.parse(raw) as { state?: { theme?: ThemeChoice } };
      const choice = parsed.state?.theme ?? 'system';
      applyTheme(resolveTheme(choice));
      return;
    }
  } catch {
    /* ignore and fall back to system */
  }
  applyTheme(systemTheme());
}

if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => {
    const s = useThemeStore.getState();
    if (s.theme === 'system') {
      const resolved = systemTheme();
      applyTheme(resolved);
      useThemeStore.setState({ resolved });
    }
  });
}
