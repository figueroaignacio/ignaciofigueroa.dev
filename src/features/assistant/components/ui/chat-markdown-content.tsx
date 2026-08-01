import { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

export function ChatMarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-base font-medium mt-5 mb-2 text-foreground tracking-tight border-b border-rule pb-1.5">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-sm font-bold mt-4 mb-2 text-foreground tracking-tight">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-semibold mt-3 mb-1.5 text-foreground/90 tracking-tight">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-3 last:mb-0 text-sm text-foreground/90 leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => <ul className="list-none ml-0 mb-3.5 space-y-1.5">{children}</ul>,
        ol: ({ children }) => (
          <ol className="list-decimal list-outside ml-4 mb-3.5 space-y-1.5 text-sm text-foreground/90 marker:text-muted-foreground/50 marker:text-xs">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="flex gap-2 items-start text-sm text-foreground/90 leading-relaxed">
            <span className="mt-[8px] shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground/45 block" />
            <span>{children}</span>
          </li>
        ),
        code: ({
          inline,
          className,
          children,
          ...props
        }: ComponentProps<'code'> & { inline?: boolean }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline ? (
            <div className="relative my-3 rounded-xl overflow-hidden border border-border bg-card">
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-muted-foreground/50" />
                  <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
                    {match?.[1] || 'code'}
                  </span>
                </div>
              </div>
              <div className="m-1.5 mt-0 p-3.5 overflow-x-auto rounded-lg bg-[#1b1b1c] dark:bg-black/60 border border-border/40">
                <code
                  className={`block text-[12px] font-mono text-[#e3e3e3] leading-relaxed ${className ?? ''}`}
                  {...props}
                >
                  {children}
                </code>
              </div>
            </div>
          ) : (
            <code
              className="bg-secondary/60 text-foreground/90 px-1.5 py-0.5 rounded-md text-[12px] font-mono border border-border/40"
              {...props}
            >
              {children}
            </code>
          );
        },
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-3 decoration-primary/30 hover:decoration-primary/70 font-medium transition-colors text-[13px]"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-muted-foreground/30 pl-3.5 py-0.5 my-3 text-[13px] text-muted-foreground italic">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-4 border-border/30" />,
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => <em className="italic text-foreground/75">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
