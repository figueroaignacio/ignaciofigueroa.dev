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
          <h1 className="text-base font-semibold mt-5 mb-2 text-foreground tracking-tight border-b border-rule pb-1.5">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-sm font-semibold mt-4 mb-2 text-foreground tracking-tight">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-medium mt-3 mb-1.5 text-foreground/90 tracking-tight">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-3 last:mb-0 text-sm text-foreground/90 leading-relaxed">{children}</p>
        ),
        /* Lists mirror the experience timeline's bullets — real markers with a
           hairline color, not hand-built dots on a flex row. */
        ul: ({ children }) => (
          <ul className="mb-3.5 ml-4 list-disc space-y-1.5 marker:text-border">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-3.5 ml-4 list-outside list-decimal space-y-1.5 marker:text-xs marker:text-muted-foreground/50">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-sm leading-relaxed text-foreground/90">{children}</li>
        ),
        code: ({
          inline,
          className,
          children,
          ...props
        }: ComponentProps<'code'> & { inline?: boolean }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline ? (
            /* One box, one rule, theme tokens throughout — the old inner panel
               hardcoded a near-black fill that stayed dark in light mode. */
            <div className="my-3 overflow-hidden rounded-sm border border-border bg-card">
              <div className="border-b border-border px-3 py-1.5">
                <span className="type-chip uppercase text-muted-foreground">
                  {match?.[1] || 'code'}
                </span>
              </div>
              <div className="overflow-x-auto bg-surface-muted p-3.5">
                <code
                  className={`block font-mono text-xs leading-relaxed text-foreground/90 ${className ?? ''}`}
                  {...props}
                >
                  {children}
                </code>
              </div>
            </div>
          ) : (
            <code
              className="bg-secondary/60 text-foreground/90 px-1.5 py-0.5 rounded-md text-xs font-mono border border-border/40"
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
            className="font-medium text-foreground underline decoration-border underline-offset-3 transition-colors hover:text-brand hover:decoration-brand"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-muted-foreground/30 pl-3.5 py-0.5 my-3 text-[13px] text-muted-foreground italic">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-4 border-rule" />,
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
