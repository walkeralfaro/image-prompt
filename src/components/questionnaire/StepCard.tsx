import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function StepCard({
  title,
  subtitle,
  children,
  aside,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-app-border bg-app-card p-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-app-muted">{subtitle}</p>}
      </div>
      <div className={cn('grid gap-4', aside ? 'md:grid-cols-[1fr_280px]' : 'grid-cols-1')}>
        <div className="space-y-3">{children}</div>
        {aside && <div>{aside}</div>}
      </div>
    </section>
  );
}
