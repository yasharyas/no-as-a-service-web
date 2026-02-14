import { Terminal } from 'lucide-react';
import { APP_META } from '@/lib/constants';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export default function ApiDocsPreview() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <h2 className="mb-4 text-center text-3xl font-bold tracking-tight">
        For Developers
      </h2>
      <p className="mb-10 text-center text-muted-foreground">
        Integrate the API into your projects. It&apos;s free and open.
      </p>

      <div className="mx-auto max-w-2xl relative rounded-[1.25rem] border-[0.75px] border-border p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative overflow-hidden rounded-xl border-[0.75px] border-border bg-card shadow-sm">
        {/* Terminal header */}
        <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground">
            Terminal
          </span>
        </div>

        {/* Code block */}
        <div className="p-4 sm:p-6">
          <pre className="overflow-x-auto text-sm">
            <code className="font-mono">
              <span className="text-muted-foreground">$ </span>
              <span className="text-primary">curl</span>{' '}
              <span className="text-foreground">https://naas.isalman.dev/no</span>
              {'\n\n'}
              <span className="text-muted-foreground">{`// Response`}</span>
              {'\n'}
              <span className="text-foreground">{`{`}</span>
              {'\n'}
              <span className="text-foreground">{`  "reason": "I can't, I have plans with my couch."`}</span>
              {'\n'}
              <span className="text-foreground">{`}`}</span>
            </code>
          </pre>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted px-4 py-3 text-center">
          <a
            href={APP_META.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            View full documentation on GitHub →
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
