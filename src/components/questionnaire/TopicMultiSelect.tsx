import { antiTropesData, TOPICS, TOPIC_EXAMPLES, TOPIC_EXAMPLE_IMAGES } from '../../data/antiTropesData';
import { usePromptStore } from '../../store/usePromptStore';
import { CustomInput } from './CustomInput';
import { RecommendationTooltip } from './RecommendationTooltip';

export function TopicMultiSelect() {
  const { answers, setAnswer, customAnswers, setCustomAnswer, selectedTopics, toggleTopic } =
    usePromptStore();

  return (
    <div className="space-y-3">
      <CustomInput
        label="Texto libre de exclusiones (opcional)"
        value={answers.evita === 'custom' ? customAnswers.evita : answers.evita}
        onChange={(v) => {
          setAnswer('evita', 'custom');
          setCustomAnswer('evita', v);
        }}
        placeholder="Ej. degradados extra"
      />
      <p className="text-xs text-app-muted">
        O escribe directamente arriba. También puedes combinar temáticas:
      </p>
      <div className="grid grid-cols-2 gap-2">
        {TOPICS.map((topic) => {
          const active = selectedTopics.includes(topic);
          return (
            <button
              key={topic}
              type="button"
              onClick={() => toggleTopic(topic)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                active
                  ? 'border-app-accent bg-app-accent/15'
                  : 'border-app-border bg-app-bg hover:border-app-accent/60'
              }`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={active}
                  readOnly
                  className="h-4 w-4 accent-[#8b5cf6]"
                />
                <span className="flex items-center gap-1.5 font-medium">
                  {topic}
                  <RecommendationTooltip
                    example={TOPIC_EXAMPLES[topic]}
                    exampleImage={TOPIC_EXAMPLE_IMAGES[topic]}
                  />
                </span>
              </span>
              <span className="mt-1 block text-xs text-app-muted">
                {antiTropesData[topic].join(', ')}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-app-muted">
        La línea 7 siempre termina con la antiguía fija.
      </p>
    </div>
  );
}
