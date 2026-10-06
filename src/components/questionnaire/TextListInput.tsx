import { useState } from 'react';
import { ArrowDown, ArrowUp, Check, Pencil, Plus, Trash2, X } from 'lucide-react';
import { usePromptStore } from '../../store/usePromptStore';

export function TextListInput() {
  const { textList, setTextList, noText, setNoText } = usePromptStore();
  const [draft, setDraft] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState('');
  const [editError, setEditError] = useState(false);

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    setTextList([...textList, v]);
    setDraft('');
  };

  const remove = (i: number) => {
    if (editingIndex === i) {
      setEditingIndex(null);
      setEditDraft('');
      setEditError(false);
    }
    setTextList(textList.filter((_, idx) => idx !== i));
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= textList.length) return;
    const next = [...textList];
    [next[i], next[j]] = [next[j], next[i]];
    setTextList(next);
    if (editingIndex === i) setEditingIndex(j);
    else if (editingIndex === j) setEditingIndex(i);
  };

  const startEdit = (i: number) => {
    setEditingIndex(i);
    setEditDraft(textList[i]);
    setEditError(false);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditDraft('');
    setEditError(false);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const v = editDraft.trim();
    if (!v) {
      setEditError(true);
      return;
    }
    const next = [...textList];
    next[editingIndex] = v;
    setTextList(next);
    setEditingIndex(null);
    setEditDraft('');
    setEditError(false);
  };

  const handleNoText = (checked: boolean) => {
    setNoText(checked);
    if (checked) cancelEdit();
  };

  return (
    <div className="space-y-3">
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={noText}
          onChange={(e) => handleNoText(e.target.checked)}
          className="h-4 w-4 accent-[#8b5cf6]"
        />
        Sin texto en la imagen base (se maquetará en editor externo)
      </label>

      {!noText && (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  add();
                }
              }}
              placeholder='Ej. Noche Sonar, 12 OCT 2026'
              className="flex-1 rounded-xl border border-app-border bg-app-bg px-3 py-2 text-sm outline-none placeholder:text-app-muted/60 focus:border-app-accent"
            />
            <button
              type="button"
              onClick={add}
              className="flex items-center gap-1 rounded-xl bg-app-accent px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Añadir
            </button>
          </div>

          {textList.length === 0 ? (
            <p className="text-xs text-app-muted">
              Añade uno o más textos. Se generará: <code>"a", "b" y ningún otro texto</code>.
            </p>
          ) : (
            <ul className="space-y-2">
              {textList.map((t, i) => (
                <li
                  key={`${i}-${t}`}
                  className="flex items-center gap-2 rounded-xl border border-app-border bg-app-bg px-3 py-2 text-sm"
                >
                  {editingIndex === i ? (
                    <>
                      <input
                        type="text"
                        value={editDraft}
                        autoFocus
                        onChange={(e) => {
                          setEditDraft(e.target.value);
                          if (editError && e.target.value.trim()) setEditError(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            saveEdit();
                          } else if (e.key === 'Escape') {
                            e.preventDefault();
                            cancelEdit();
                          }
                        }}
                        aria-label={`Editar texto ${i + 1}`}
                        aria-invalid={editError}
                        className={`flex-1 rounded-lg border bg-transparent px-2 py-1 text-sm outline-none ${
                          editError
                            ? 'border-red-400 focus:border-red-400'
                            : 'border-app-accent focus:border-app-accent'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={saveEdit}
                        aria-label="Guardar"
                        className="text-green-400 hover:text-green-300"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        aria-label="Cancelar"
                        className="text-app-muted hover:text-app-cream"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 truncate">“{t}”</span>
                      <button
                        type="button"
                        onClick={() => startEdit(i)}
                        aria-label={`Editar "${t}"`}
                        className="text-app-muted hover:text-app-cream"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(i, -1)}
                        aria-label="Subir"
                        className="text-app-muted hover:text-app-cream"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(i, 1)}
                        aria-label="Bajar"
                        className="text-app-muted hover:text-app-cream"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        aria-label="Quitar"
                        className="text-app-muted hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          {editError && editingIndex !== null && (
            <p role="alert" className="text-xs text-red-400">
              El texto no puede quedar vacío: se conserva el valor original.
            </p>
          )}
        </>
      )}
    </div>
  );
}
