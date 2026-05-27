import { cn } from '@/shared/lib/cn';

interface ProjectVideoProps {
  videoUrl?: string | null;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function ProjectVideo({
  videoUrl,
  className,
  autoPlay,
  muted,
  loop,
  controls = true,
}: ProjectVideoProps) {
  if (!videoUrl) return null;

  return (
    <div
      className={cn(
        'my-12 overflow-hidden rounded-sm bg-muted/20 border border-border/40 shadow-sm ring-1 ring-border/10',
        className,
      )}
    >
      <video
        src={videoUrl}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        className="w-full aspect-video object-cover"
        preload="metadata"
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
