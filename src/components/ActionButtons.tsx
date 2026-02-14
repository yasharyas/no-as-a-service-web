'use client';

import { RefreshCw, Copy, Check, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useClipboard } from '@/hooks/useClipboard';
import { SHARE_URLS } from '@/lib/constants';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import type { SharePlatform } from '@/types';

interface ActionButtonsProps {
  reason: string;
  loading: boolean;
  onGenerate: () => void;
}

export default function ActionButtons({ reason, loading, onGenerate }: ActionButtonsProps) {
  const { copied, copyToClipboard } = useClipboard();
  const [showShare, setShowShare] = useState(false);

  const handleCopy = () => {
    if (reason) copyToClipboard(reason);
  };

  const handleShare = (platform: SharePlatform) => {
    if (!reason) return;

    if (platform === 'copy-link') {
      const url = `${window.location.origin}/?reason=${encodeURIComponent(reason)}`;
      copyToClipboard(url);
    } else {
      const shareText = `"${reason}" — via No-as-a-Service 🚫`;
      window.open(SHARE_URLS[platform](shareText), '_blank', 'noopener,noreferrer');
    }
    setShowShare(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'No-as-a-Service',
          text: `"${reason}" — Say No. Creatively.`,
          url: `${window.location.origin}/?reason=${encodeURIComponent(reason)}`,
        });
      } catch {
        // User cancelled or share failed — open fallback menu
        setShowShare(true);
      }
    } else {
      setShowShare(true);
    }
  };

  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-4 px-4">
      {/* Main buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Generate */}
        <div className="relative rounded-xl border-[0.75px] border-border p-0.5">
          <GlowingEffect
            spread={30}
            glow={true}
            disabled={false}
            proximity={48}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <button
            onClick={onGenerate}
            disabled={loading}
            className="relative flex items-center gap-2 rounded-[10px] bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-md transition-all hover:brightness-110 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Generate another rejection reason"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {/* Copy */}
        <div className="relative rounded-xl border-[0.75px] border-border p-0.5">
          <GlowingEffect
            spread={30}
            glow={true}
            disabled={false}
            proximity={48}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <button
            onClick={handleCopy}
            disabled={!reason}
            className="relative flex items-center gap-2 rounded-[10px] bg-card px-5 py-3 font-medium text-card-foreground shadow-sm transition-all hover:bg-muted active:scale-95 disabled:opacity-60"
            aria-label={copied ? 'Copied to clipboard' : 'Copy rejection reason'}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Share */}
        <div className="relative rounded-xl border-[0.75px] border-border p-0.5">
          <GlowingEffect
            spread={30}
            glow={true}
            disabled={false}
            proximity={48}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <button
            onClick={handleNativeShare}
            disabled={!reason}
            className="relative flex items-center gap-2 rounded-[10px] bg-card px-5 py-3 font-medium text-card-foreground shadow-sm transition-all hover:bg-muted active:scale-95 disabled:opacity-60"
            aria-label="Share rejection reason"
          >
            <Share2 className="h-5 w-5" />
            Share
          </button>
        </div>
      </div>

      {/* Share dropdown */}
      {showShare && (
        <div className="relative rounded-xl border-[0.75px] border-border p-0.5">
          <GlowingEffect
            spread={30}
            glow={true}
            disabled={false}
            proximity={48}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <div className="relative flex flex-wrap justify-center gap-2 rounded-[10px] bg-card p-3 shadow-md">
          <button
            onClick={() => handleShare('twitter')}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            𝕏 Twitter
          </button>
          <button
            onClick={() => handleShare('whatsapp')}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            WhatsApp
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            LinkedIn
          </button>
          <button
            onClick={() => handleShare('copy-link')}
            className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            🔗 Copy Link
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
