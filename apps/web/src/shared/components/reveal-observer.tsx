'use client';

import { useEffect } from 'react';

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight * 0.88 && box.bottom > 0) {
          el.setAttribute('data-revealed', '');
          return;
        }
        io.observe(el);
      });
    };

    scan();
    root.classList.add('reveal-ready');

    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mutations.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
