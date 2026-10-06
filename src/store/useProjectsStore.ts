import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsState {
  projects: Project[];
  activeProjectId: string | null;
  ensureDefault: (fallbackName?: string) => string;
  createProject: (name: string) => string | null;
  renameProject: (id: string, name: string) => void;
  duplicateProject: (id: string) => string | null;
  deleteProject: (id: string) => void;
  setActive: (id: string) => void;
  touch: (id: string) => void;
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as Crypto).randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const DEFAULT_PROJECT_NAME = 'Mi primer proyecto';

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,

      ensureDefault: (fallbackName = DEFAULT_PROJECT_NAME) => {
        const s = get();
        if (s.activeProjectId && s.projects.some((p) => p.id === s.activeProjectId)) {
          return s.activeProjectId;
        }
        if (s.projects.length > 0) {
          const id = s.projects[0].id;
          set({ activeProjectId: id });
          return id;
        }
        const now = new Date().toISOString();
        const project: Project = {
          id: makeId(),
          name: fallbackName.trim() === '' ? DEFAULT_PROJECT_NAME : fallbackName.trim(),
          createdAt: now,
          updatedAt: now,
        };
        set({ projects: [project], activeProjectId: project.id });
        return project.id;
      },

      createProject: (name) => {
        const clean = name.trim();
        if (clean === '') return null;
        const now = new Date().toISOString();
        const project: Project = { id: makeId(), name: clean, createdAt: now, updatedAt: now };
        set((s) => ({ projects: [...s.projects, project], activeProjectId: project.id }));
        return project.id;
      },

      renameProject: (id, name) => {
        const clean = name.trim();
        if (clean === '') return;
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, name: clean, updatedAt: new Date().toISOString() } : p,
          ),
        }));
      },

      duplicateProject: (id) => {
        const src = get().projects.find((p) => p.id === id);
        if (!src) return null;
        const now = new Date().toISOString();
        const copy: Project = {
          id: makeId(),
          name: `${src.name} (copia)`,
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ projects: [...s.projects, copy], activeProjectId: copy.id }));
        return copy.id;
      },

      deleteProject: (id) => {
        const s = get();
        if (s.projects.length <= 1) return;
        const projects = s.projects.filter((p) => p.id !== id);
        const activeProjectId =
          s.activeProjectId === id ? (projects[0]?.id ?? null) : s.activeProjectId;
        set({ projects, activeProjectId });
      },

      setActive: (id) => {
        if (!get().projects.some((p) => p.id === id)) return;
        set({ activeProjectId: id });
      },

      touch: (id) => {
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, updatedAt: new Date().toISOString() } : p,
          ),
        }));
      },
    }),
    {
      name: 'image-prompt-projects-v2',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
