import React, { useState, useEffect, useRef } from 'react';

export function LazySection({
  children,
  height = "100vh",
  onVisible,
}: {
  children: React.ReactNode;
  height?: string;
  onVisible?: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
          observer.disconnect();
        }
      },
      { rootMargin: "1800px 0px" } // Mount early so Lenis can measure the expanded page before users reach it
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : height }}>
      {isVisible && children}
    </div>
  );
}
