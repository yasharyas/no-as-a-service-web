import { Github, Heart } from 'lucide-react';
import { APP_META } from '@/lib/constants';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          Built with <Heart className="h-4 w-4 text-primary" /> by{' '}
          <a
            href="https://github.com/yasharyas"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-primary transition-colors"
          >
            yasharyas
          </a>
        </p>

        <div className="flex items-center gap-4">
          <div className="relative rounded-lg border-[0.75px] border-transparent p-0.5">
            <GlowingEffect
              spread={20}
              glow={true}
              disabled={false}
              proximity={32}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <a
              href={APP_META.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View source on GitHub"
            >
              <Github className="h-4 w-4" />
              Source
            </a>
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NaaS
          </span>
        </div>
      </div>
    </footer>
  );
}
