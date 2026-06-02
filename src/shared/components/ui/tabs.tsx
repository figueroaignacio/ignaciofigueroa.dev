'use client';

import { cn } from '@/shared/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'motion/react';
import * as React from 'react';

// --- Animation constants (module level) ---

const TABS_INDICATOR_TRANSITION = { type: 'spring', bounce: 0.2, duration: 0.6 } as const;

// --- CVA ---

const tabsListVariants = cva(
  'inline-flex rounded-xl p-1 text-muted-foreground w-full sm:w-auto overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-secondary/45 border border-border/60 backdrop-blur-sm',
        outline: 'border border-border/60 bg-transparent',
        underline: 'bg-transparent border-b border-border rounded-none p-0 justify-start w-full',
        ghost: 'bg-transparent p-0 gap-2',
        unstyled: '',
      },
      size: {
        default: 'h-10',
        sm: 'h-9',
        lg: 'h-12',
      },
    },
  },
);

const tabsTriggerVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 z-10 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground data-[state=active]:text-foreground',
        outline: 'text-muted-foreground data-[state=active]:text-foreground',
        underline:
          'text-muted-foreground hover:text-foreground data-[state=active]:text-foreground rounded-none bg-transparent px-4 pb-3 pt-2',
        ghost:
          'text-muted-foreground hover:text-foreground data-[state=active]:text-foreground hover:bg-muted/50 rounded-md',
      },
      size: {
        default: 'text-sm',
        sm: 'text-xs',
        lg: 'text-base px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// --- Context ---

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  direction: number;
  setDirection: (dir: number) => void;
  variant: NonNullable<TabsProps['variant']>;
  layoutId: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.use(TabsContext);
  if (!context) throw new Error('Tabs components must be used within Tabs');
  return context;
}

// --- Components ---

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'outline' | 'underline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const TabsRoot = ({
  className,
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = 'default',
  size: _size = 'default',
  children,
  ref,
  ...props
}: TabsProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const activeTab = isControlled ? controlledValue : internalValue;
  const [direction, setDirection] = React.useState(0);
  const layoutId = React.useId();

  const setActiveTab = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );

  return (
    <TabsContext
      value={{
        activeTab,
        setActiveTab,
        direction,
        setDirection,
        variant,
        layoutId,
      }}
    >
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext>
  );
};
TabsRoot.displayName = 'Tabs';

interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsListVariants> {}

const TabsList = ({
  className,
  variant,
  size,
  children,
  ref,
  ...props
}: TabsListProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const { variant: contextVariant } = useTabsContext();
  const finalVariant = variant || contextVariant;

  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation="horizontal"
      className={cn(tabsListVariants({ variant: finalVariant, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
TabsList.displayName = 'TabsList';

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof tabsTriggerVariants> {
  value: string;
  children: React.ReactNode;
}

const TabsTrigger = ({
  className,
  value,
  children,
  variant,
  size,
  ref,
  ...props
}: TabsTriggerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const {
    activeTab,
    setActiveTab,
    setDirection,
    variant: contextVariant,
    layoutId,
  } = useTabsContext();
  const isActive = activeTab === value;
  const finalVariant = variant || contextVariant;
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const parent = buttonRef.current?.parentElement;
    if (parent) {
      const childrenArray = Array.from(parent.children);
      const newIndex = childrenArray.indexOf(buttonRef.current!);
      const currentIndex = childrenArray.findIndex(
        (child) => child.getAttribute('data-state') === 'active',
      );
      if (currentIndex !== -1 && newIndex !== currentIndex) {
        setDirection(newIndex > currentIndex ? 1 : -1);
      }
    }
    setActiveTab(value);
    props.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const parent = buttonRef.current?.parentElement;
    if (!parent) return;

    const triggers = Array.from(parent.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const currentIndex = triggers.indexOf(buttonRef.current!);

    let newIndex = currentIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = (currentIndex + 1) % triggers.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = triggers.length - 1;
    }

    if (newIndex !== currentIndex) {
      triggers[newIndex]?.focus();
      triggers[newIndex]?.click();
    }
  };

  // Merge the external ref with our internal buttonRef
  React.useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(buttonRef.current);
    } else {
      (ref as React.MutableRefObject<HTMLButtonElement | null>).current = buttonRef.current;
    }
  }, [ref]);

  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={`${layoutId}-trigger-${value}`}
      aria-selected={isActive}
      aria-controls={`${layoutId}-content-${value}`}
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(tabsTriggerVariants({ variant: finalVariant, size }), className)}
      {...props}
    >
      <span className="inherit relative z-20">{children}</span>
      {isActive && (
        <motion.div
          layoutId={`${layoutId}-indicator`}
          className={cn(
            'absolute inset-0 z-10',
            finalVariant === 'underline'
              ? 'bg-secondary-foreground top-auto bottom-0 h-[2px] shadow-[0_0_10px_rgba(var(--primary),0.5)]'
              : 'bg-card border-border/60 rounded-[10px] border shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)]',
          )}
          transition={TABS_INDICATOR_TRANSITION}
        />
      )}
    </button>
  );
};
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = ({
  className,
  value,
  children,
  ref,
  ...props
}: TabsContentProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const { activeTab, layoutId } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${layoutId}-content-${value}`}
      aria-labelledby={`${layoutId}-trigger-${value}`}
      tabIndex={0}
      className={cn(
        'ring-offset-background focus-visible:ring-ring mt-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
TabsContent.displayName = 'TabsContent';

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export { Tabs };
