import { useEffect, useState } from 'react';
import { Copy, FolderOpen, Pencil, Plus, Trash2 } from 'lucide-react';
import { DEFAULT_PROJECT_NAME, useProjectsStore } from '../../store/useProjectsStore';
import { usePromptStore } from '../../store/usePromptStore';

export function ProjectSwitcher({ compact = false }: { compact?: boolean }) {
  const projects = useProjectsStore((s) => s.projects);
  const activeProjectId = useProjectsStore((s) => s.activeProjectId);
  const ensureDefault = useProjectsStore((s) => s.ensureDefault);
  const createProject = useProjectsStore((s) => s.createProject);
  const renameProject = useProjectsStore((s) => s.renameProject);
  const duplicateProject = useProjectsStore((s) => s.duplicateProject);
  const deleteProject = useProjectsStore((s) => s.deleteProject);
  const setActive = useProjectsStore((s) => s.setActive);
  const [migrated, setMigrated] = useState(false);

  useEffect(() => {
    if (migrated) return;
    const promptState = usePromptStore.getState();
    const fallback =
      promptState.projectName.trim() === '' ? DEFAULT_PROJECT_NAME : promptState.projectName.trim();
    const id = ensureDefault(fallback);
    promptState.migrateLegacyHistory(id);
    promptState.saveDraftForProject(id);
    setMigrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [migrated]);

  if (!migrated || !activeProjectId) {
    return (
      <div className="rounded-xl border border-app-border px-3 py-2 text-xs text-app-muted">
        Cargando proyectos…
      </div>
    );
  }

  const switchTo = (nextId: string) => {
    if (nextId === activeProjectId) return;
    const promptState = usePromptStore.getState();
    promptState.saveDraftForProject(activeProjectId);
    setActive(nextId);
    promptState.loadDraftForProject(nextId);
    const next = useProjectsStore.getState().projects.find((p) => p.id === nextId);
    if (next) {
      usePromptStore.setState({ projectName: usePromptStore.getState().projectName || next.name });
    }
  };

  const handleCreate = () => {
    const name = window.prompt('Nombre del nuevo proyecto:', `Proyecto ${projects.length + 1}`);
    if (name === null) return;
    if (name.trim() === '') {
      window.alert('El nombre no puede estar vacío.');
      return;
    }
    const promptState = usePromptStore.getState();
    promptState.saveDraftForProject(activeProjectId);
    const id = createProject(name);
    if (id) {
      promptState.loadDraftForProject(id);
      usePromptStore.setState({ projectName: name.trim() });
    }
  };

  const handleRename = () => {
    const current = projects.find((p) => p.id === activeProjectId);
    const name = window.prompt('Renombrar proyecto:', current?.name ?? '');
    if (name === null) return;
    if (name.trim() === '') {
      window.alert('El nombre no puede estar vacío.');
      return;
    }
    renameProject(activeProjectId, name);
    usePromptStore.setState({ projectName: name.trim() });
  };

  const handleDuplicate = () => {
    const promptState = usePromptStore.getState();
    promptState.saveDraftForProject(activeProjectId);
    const currentDraft = promptState.projectDrafts[activeProjectId];
    const id = duplicateProject(activeProjectId);
    if (id && currentDraft) {
      usePromptStore.setState((s) => ({
        projectDrafts: { ...s.projectDrafts, [id]: { ...currentDraft } },
      }));
      promptState.loadDraftForProject(id);
    }
  };

  const handleDelete = () => {
    if (projects.length <= 1) {
      window.alert('No puedes eliminar el único proyecto.');
      return;
    }
    const current = projects.find((p) => p.id === activeProjectId);
    if (!window.confirm(`¿Eliminar el proyecto "${current?.name}" y sus borradores? El historial de ese proyecto se conserva salvo vaciado.`)) return;
    const remaining = projects.filter((p) => p.id !== activeProjectId);
    deleteProject(activeProjectId);
    const nextId = remaining[0]?.id;
    if (nextId) {
      usePromptStore.getState().loadDraftForProject(nextId);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-app-border bg-app-card p-3">
      <span className="flex items-center gap-1.5 text-xs font-bold text-app-muted">
        <FolderOpen className="h-4 w-4" /> Proyecto
      </span>
      <select
        aria-label="Proyecto activo"
        value={activeProjectId}
        onChange={(e) => switchTo(e.target.value)}
        className="min-w-40 flex-1 rounded-xl border border-app-border bg-app-bg px-3 py-1.5 text-sm outline-none focus:border-app-accent"
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      {!compact && (
        <span className="flex gap-1">
          <button type="button" title="Nuevo proyecto" onClick={handleCreate} className="rounded-lg border border-app-border p-1.5 hover:border-app-accent" aria-label="Nuevo proyecto">
            <Plus className="h-4 w-4" />
          </button>
          <button type="button" title="Renombrar" onClick={handleRename} className="rounded-lg border border-app-border p-1.5 hover:border-app-accent" aria-label="Renombrar proyecto">
            <Pencil className="h-4 w-4" />
          </button>
          <button type="button" title="Duplicar" onClick={handleDuplicate} className="rounded-lg border border-app-border p-1.5 hover:border-app-accent" aria-label="Duplicar proyecto">
            <Copy className="h-4 w-4" />
          </button>
          <button type="button" title="Eliminar" onClick={handleDelete} disabled={projects.length <= 1} className="rounded-lg border border-app-border p-1.5 hover:border-red-500 hover:text-red-400 disabled:opacity-40" aria-label="Eliminar proyecto">
            <Trash2 className="h-4 w-4" />
          </button>
        </span>
      )}
    </div>
  );
}
