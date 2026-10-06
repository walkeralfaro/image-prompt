import { useId, useState } from 'react';
import { Info } from 'lucide-react';
import type { ExampleContent } from '../../data/stepsData';

type ExampleProp = string | ExampleContent;

function normalize(example: ExampleProp, exampleImage?: string): { text: string; image?: string } {
  if (typeof example === 'string') return { text: example, image: exampleImage };
  return { text: example.text, image: example.image ?? exampleImage };
}

export function RecommendationTooltip({
  example,
  exampleImage,
}: {
  example: ExampleProp;
  exampleImage?: string;
}) {
  const tooltipId = useId();
  const [imgOk, setImgOk] = useState(true);
  const { text, image } = normalize(example, exampleImage);
  const showImage = Boolean(image) && imgOk;

  return (
    <span className="group/tip relative inline-flex shrink-0" onClick={(e) => e.stopPropagation()}>
      <span
        tabIndex={0}
        role="img"
        aria-label="Ver ejemplo"
        aria-describedby={tooltipId}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        className="inline-flex cursor-help rounded-full p-0.5 text-app-muted outline-none hover:text-app-cream focus-visible:text-app-cream focus-visible:ring-2 focus-visible:ring-app-accent"
      >
        <Info className="h-4 w-4" aria-hidden />
      </span>
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-60 max-w-[75vw] -translate-x-1/2 overflow-hidden rounded-lg border border-app-border bg-app-card text-xs font-normal leading-snug text-app-cream opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 dark:bg-black/90 sm:left-auto sm:right-0 sm:w-68 sm:translate-x-0"
      >
        {showImage && (
          <img
            src={image}
            alt={`Ejemplo visual: ${text}`}
            loading="lazy"
            decoding="async"
            width={320}
            height={180}
            className="block h-auto w-full bg-app-bg"
            onError={() => setImgOk(false)}
          />
        )}
        <span className="block px-2.5 py-1.5">{text}</span>
      </span>
    </span>
  );
}
