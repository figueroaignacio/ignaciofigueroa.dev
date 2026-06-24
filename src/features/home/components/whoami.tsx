'use client';

import { PlayCircle02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

export function WhoAmI() {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = useTranslations('sections.whoAmI');
  const videoRef = useRef<HTMLVideoElement>(null);
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section id="whoami" className="space-y-8 scroll-mt-20" aria-labelledby="whoami-title">
      <div>
        <h2 id="whoami-title" className="text-2xl font-semibold tracking-tight text-foreground">
          {t('title')}
        </h2>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{t('description')}</p>
      </div>

      <div className="relative my-12 overflow-hidden rounded-lg bg-muted/10 border border-border/50 shadow-sm">
        {!isPlaying && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10 hover:bg-black/30 transition-colors duration-200 w-full h-full"
            aria-label={t('play')}
          >
            <div className="text-center flex flex-col items-center gap-3">
              <HugeiconsIcon icon={PlayCircle02Icon} className="w-16 h-16 text-white/90" />
              <p className="text-sm text-white/80">{t('play')}</p>
            </div>
          </button>
        )}
        <video
          ref={videoRef}
          src={t('videoUrl')}
          controls
          className="w-full aspect-video object-cover"
          preload="metadata"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          aria-label={t('videoLabel')}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
