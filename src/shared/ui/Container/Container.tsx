import { ReactNode, HTMLAttributes, ElementType, forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    { children, className, as: Component = 'div', size = 'default', ...props },
    ref
  ) => {
    const sizes = {
      default: 'max-w-[1200px]',
      narrow: 'max-w-[800px]',
      wide: 'max-w-[1440px]',
      full: 'max-w-full',
    };

    return (
      <Component
        ref={ref}
        className={cn('mx-auto px-5 md:px-8 w-full', sizes[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Container.displayName = "Container";
