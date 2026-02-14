import { MousePointerClick, Sparkles, Share2 } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Click',
    description: 'Hit the generate button to get a creative rejection reason.',
  },
  {
    icon: Sparkles,
    title: 'Generate',
    description: 'Our API serves up a witty, unique "No" just for you.',
  },
  {
    icon: Share2,
    title: 'Share',
    description: 'Copy it, share it on social media, or send it to a friend.',
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
        How It Works
      </h2>

      <div className="grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <step.icon className="h-7 w-7" />
            </div>
            <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Step {i + 1}
            </span>
            <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
