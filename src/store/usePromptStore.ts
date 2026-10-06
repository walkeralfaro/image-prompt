import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { StepField } from '../data/stepsData';

export interface PromptRecord {
  id: string;
  createdAt: string;
  projectId: string | null;
  projectName: string;
  promptText: string;
  promptEnText?: string;
  answers: Record<StepField, string>;
  customAnswers: Record<StepField, string>;
  textList: string[];
  noText: boolean;
  selectedTopics: string[];
}

export interface ProjectDraft {
  answers: Record<StepField, string>;
  customAnswers: Record<StepField, string>;
  textList: string[];
  noText: boolean;
  selectedTopics: string[];
  projectName: string;
  confirmedSteps: boolean[];
  currentStep: number;
}

const emptyAnswers = (): Record<StepField, string> => ({
  formato: '',
  queEs: '',
  tema: '',
  estilo: '',
  textoExacto: '',
  tipografiaPaleta: '',
  evita: '',
});

interface PromptState {
  currentStep: number;
  answers: Record<StepField, string>;
  customAnswers: Record<StepField, string>;
  textList: string[];
  noText: boolean;
  selectedTopics: string[];
  projectName: string;
  confirmedSteps: boolean[];
  history: PromptRecord[];
  editingId: string | null;
  projectDrafts: Record<string, ProjectDraft>;
  showAllHistory: boolean;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setAnswer: (field: StepField, value: string) => void;
  setCustomAnswer: (field: StepField, value: string) => void;
  setTextList: (list: string[]) => void;
  setNoText: (v: boolean) => void;
  toggleTopic: (topic: string) => void;
  setProjectName: (v: string) => void;
  confirmStep: (index: number) => void;
  unconfirmStep: (index: number) => void;
  saveToHistory: (promptText: string, promptEnText?: string, projectId?: string | null) => void;
  deleteRecord: (id: string) => void;
  clearHistory: (projectId?: string | null) => void;
  loadRecord: (id: string) => void;
  resetQuestionnaire: () => void;
  setShowAllHistory: (v: boolean) => void;
  saveDraftForProject: (projectId: string) => void;
  loadDraftForProject: (projectId: string) => void;
  migrateLegacyHistory: (projectId: string) => void;
  getFinalAnswer: (field: StepField) => string;
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as Crypto).randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const PERSIST_KEY = 'image-prompt-store-v2';
const LEGACY_KEYS = ['app-prompt-store', 'beailabs-prompt-store'];

function storageWithFallback() {
  const ls = () => {
    try {
      return window.localStorage;
    } catch {
      return undefined;
    }
  };
  return {
    getItem: (name: string) => {
      const store = ls();
      if (!store) return null;
      const direct = store.getItem(name);
      if (direct !== null) return direct;
      for (const legacy of LEGACY_KEYS) {
        const v = store.getItem(legacy);
        if (v !== null) {
          try {
            store.setItem(name, v);
          } catch {
            /* ignore quota */
          }
          return v;
        }
      }
      return null;
    },
    setItem: (name: string, value: string) => {
      ls()?.setItem(name, value);
    },
    removeItem: (name: string) => {
      const store = ls();
      if (!store) return;
      store.removeItem(name);
      for (const legacy of LEGACY_KEYS) store.removeItem(legacy);
    },
  };
}

export const usePromptStore = create<PromptState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      answers: emptyAnswers(),
      customAnswers: emptyAnswers(),
      textList: [],
      noText: false,
      selectedTopics: [],
      projectName: '',
      confirmedSteps: [false, false, false, false, false, false, false],
      history: [],
      editingId: null,
      projectDrafts: {},
      showAllHistory: false,

      setStep: (step) =>
        set({ currentStep: Math.min(Math.max(step, 1), 7) }),
      nextStep: () =>
        set((s) => ({ currentStep: Math.min(s.currentStep + 1, 7) })),
      prevStep: () =>
        set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

      setAnswer: (field, value) =>
        set((s) => ({ answers: { ...s.answers, [field]: value } })),

      setCustomAnswer: (field, value) =>
        set((s) => ({
          customAnswers: { ...s.customAnswers, [field]: value },
        })),

      setTextList: (list) => set({ textList: list }),
      setNoText: (v) => set({ noText: v }),

      toggleTopic: (topic) =>
        set((s) => ({
          selectedTopics: s.selectedTopics.includes(topic)
            ? s.selectedTopics.filter((t) => t !== topic)
            : [...s.selectedTopics, topic],
        })),

      setProjectName: (v) => set({ projectName: v }),

      confirmStep: (index) =>
        set((s) => {
          const next = [...s.confirmedSteps];
          next[index] = true;
          return { confirmedSteps: next };
        }),

      unconfirmStep: (index) =>
        set((s) => {
          const next = [...s.confirmedSteps];
          next[index] = false;
          return { confirmedSteps: next };
        }),

      saveToHistory: (promptText, promptEnText, projectId = null) =>
        set((s) => {
          const projectName =
            s.projectName.trim() === '' ? 'Mi primer proyecto' : s.projectName.trim();
          if (s.editingId) {
            const history = s.history.map((r) =>
              r.id === s.editingId
                ? {
                    ...r,
                    projectId: r.projectId ?? projectId,
                    projectName,
                    promptText,
                    promptEnText: promptEnText ?? r.promptEnText,
                    answers: { ...s.answers },
                    customAnswers: { ...s.customAnswers },
                    textList: [...s.textList],
                    noText: s.noText,
                    selectedTopics: [...s.selectedTopics],
                  }
                : r,
            );
            return { history, editingId: null };
          }
          const record: PromptRecord = {
            id: makeId(),
            createdAt: new Date().toISOString(),
            projectId,
            projectName,
            promptText,
            promptEnText,
            answers: { ...s.answers },
            customAnswers: { ...s.customAnswers },
            textList: [...s.textList],
            noText: s.noText,
            selectedTopics: [...s.selectedTopics],
          };
          const history = [record, ...s.history].slice(0, 100);
          return { history };
        }),

      deleteRecord: (id) =>
        set((s) => ({
          history: s.history.filter((r) => r.id !== id),
          editingId: s.editingId === id ? null : s.editingId,
        })),

      clearHistory: (projectId) =>
        set((s) => {
          if (projectId === undefined) return { history: [], editingId: null };
          return {
            history: s.history.filter((r) => r.projectId !== projectId),
            editingId: s.editingId,
          };
        }),

      setShowAllHistory: (v) => set({ showAllHistory: v }),

      saveDraftForProject: (projectId) =>
        set((s) => ({
          projectDrafts: {
            ...s.projectDrafts,
            [projectId]: {
              answers: { ...s.answers },
              customAnswers: { ...s.customAnswers },
              textList: [...s.textList],
              noText: s.noText,
              selectedTopics: [...s.selectedTopics],
              projectName: s.projectName,
              confirmedSteps: [...s.confirmedSteps],
              currentStep: s.currentStep,
            },
          },
        })),

      loadDraftForProject: (projectId) =>
        set((s) => {
          const d = s.projectDrafts[projectId];
          if (!d) {
            return {
              currentStep: 1,
              answers: emptyAnswers(),
              customAnswers: emptyAnswers(),
              textList: [],
              noText: false,
              selectedTopics: [],
              projectName: '',
              confirmedSteps: [false, false, false, false, false, false, false],
              editingId: null,
            };
          }
          return {
            answers: { ...d.answers },
            customAnswers: { ...d.customAnswers },
            textList: [...d.textList],
            noText: d.noText,
            selectedTopics: [...d.selectedTopics],
            projectName: d.projectName,
            confirmedSteps: [...d.confirmedSteps],
            currentStep: d.currentStep,
            editingId: null,
          };
        }),

      migrateLegacyHistory: (projectId) =>
        set((s) => {
          let changed = false;
          const history = s.history.map((r) => {
            if (!r.projectId) {
              changed = true;
              return { ...r, projectId };
            }
            return r;
          });
          if (!changed) return {};
          return { history };
        }),

      loadRecord: (id) => {
        const rec = get().history.find((r) => r.id === id);
        if (!rec) return;
        set({
          answers: { ...rec.answers },
          customAnswers: { ...rec.customAnswers },
          textList: [...rec.textList],
          noText: rec.noText,
          selectedTopics: [...rec.selectedTopics],
          projectName: rec.projectName,
          confirmedSteps: [true, true, true, true, true, true, true],
          editingId: rec.id,
          currentStep: 1,
        });
      },

      resetQuestionnaire: () =>
        set({
          currentStep: 1,
          answers: emptyAnswers(),
          customAnswers: emptyAnswers(),
          textList: [],
          noText: false,
          selectedTopics: [],
          projectName: '',
          confirmedSteps: [false, false, false, false, false, false, false],
          editingId: null,
        }),

      getFinalAnswer: (field) => {
        const s = get();
        if (s.answers[field] === 'custom') {
          return s.customAnswers[field] || '';
        }
        return s.answers[field] || '';
      },
    }),
    { name: PERSIST_KEY, storage: createJSONStorage(() => storageWithFallback()) },
  ),
);
