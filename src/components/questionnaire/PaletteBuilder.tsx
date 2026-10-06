import { useState } from 'react';
import { usePromptStore } from '../../store/usePromptStore';
import { CustomInput } from './CustomInput';
import { OptionCard } from './OptionCard';
import { stepsData } from '../../data/stepsData';

const step6 = stepsData.find((s) => s.id === 6)!;

export function PaletteBuilder() {
  const { answers, setAnswer, customAnswers, setCustomAnswer } = usePromptStore();
  const selected = answers.tipografiaPaleta;
  const [font, setFont] = useState('');
  const [colors, setColors] = useState('');

  const applyCustom = () => {
    const parts = [font.trim(), colors.trim()].filter(Boolean);
    setAnswer('tipografiaPaleta', 'custom');
    setCustomAnswer('tipografiaPaleta', parts.join('; ') || customAnswers.tipografiaPaleta);
  };

  return (
    <div className="space-y-3">
      {step6.options.map((o) => (
        <OptionCard
          key={o.value}
          label={o.label}
          description={o.description}
          example={o.example}
          selected={selected === o.value}
          onSelect={() => setAnswer('tipografiaPaleta', o.value)}
        />
      ))}
      <OptionCard
        label="Personalizada"
        description="Define tipografía + 2-3 colores"
        selected={selected === 'custom'}
        onSelect={() => setAnswer('tipografiaPaleta', 'custom')}
      />
      {selected === 'custom' && (
        <div className="space-y-2 rounded-xl border border-app-border p-3">
          <CustomInput
            label="Tipografía"
            value={font}
            onChange={setFont}
            placeholder="Ej. Grotesk Bold"
          />
          <CustomInput
            label="Colores (2-3, separados por comas)"
            value={colors}
            onChange={setColors}
            placeholder="Ej. violeta, crema, negro"
          />
          <button
            type="button"
            onClick={applyCustom}
            className="rounded-xl border border-app-accent px-3 py-1.5 text-sm text-app-cream hover:bg-app-accent/20"
          >
            Aplicar paleta personalizada
          </button>
          {customAnswers.tipografiaPaleta && (
            <p className="text-xs text-app-muted">
              Vista previa: {customAnswers.tipografiaPaleta}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
