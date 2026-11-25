import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealDirection = 'up' | 'left' | 'right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delayMs?: number;
  className?: string;
}

/**
 * No celular (< sm), direções horizontais caem para subida vertical limpa (`translate-y-6`)
 * para evitar qualquer sensação de empurrão lateral e garantir animações imediatas em blocos altos.
 */
const HIDDEN_TRANSFORM: Record<RevealDirection, string> = {
  up: 'opacity-0 translate-y-6',
  left: 'opacity-0 translate-y-6 sm:translate-y-0 sm:-translate-x-7',
  right: 'opacity-0 translate-y-6 sm:translate-y-0 sm:translate-x-7',
  scale: 'opacity-0 scale-[0.96] translate-y-4',
};

export function ScrollReveal({
  children,
  direction = 'up',
  delayMs = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.03, rootMargin: '0px 0px -12px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : HIDDEN_TRANSFORM[direction]
      } ${className}`}
    >
      {children}
    </div>
  );
}
