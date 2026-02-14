import { Github, Heart } from 'lucide-react';
import { APP_META } from '@/lib/constants';

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
          <a
            href={APP_META.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View source on GitHub"
          >
            <Github className="h-4 w-4" />
            Source
          </a>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NaaS
          </span>
        </div>
      </div>
    </footer>
  );
}
