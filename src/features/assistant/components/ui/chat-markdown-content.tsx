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
          <h1 className="text-base font-bold mt-5 mb-2 text-foreground tracking-tight border-b border-border/40 pb-1.5">
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
          <p className="mb-2.5 last:mb-0 text-[13px] text-foreground/85 leading-[1.75]">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-none ml-0 mb-3 space-y-1.5">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside ml-4 mb-3 space-y-1.5 text-[13px] text-foreground/85 marker:text-muted-foreground/50 marker:text-xs">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="flex gap-2 items-start text-[13px] text-foreground/85 leading-[1.7]">
            <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-muted-foreground/40 block" />
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
            <div className="relative my-3 rounded-lg overflow-hidden border border-border/40 bg-muted/30 dark:bg-muted/20">
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-muted/50 dark:bg-muted/30 border-b border-border/30">
                <span className="text-[10px] font-mono text-muted-foreground/60 tracking-wide uppercase">
                  {match?.[1] || 'code'}
                </span>
              </div>
              <div className="p-3.5 overflow-x-auto">
                <code
                  className={`block text-[12px] font-mono text-foreground/90 leading-relaxed ${className ?? ''}`}
                  {...props}
                >
                  {children}
                </code>
              </div>
            </div>
          ) : (
            <code
              className="bg-muted/60 dark:bg-muted/40 text-foreground/90 px-1.5 py-0.5 rounded-md text-[12px] font-mono font-medium border border-border/30"
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
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        em: ({ children }) => <em className="italic text-foreground/75">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
