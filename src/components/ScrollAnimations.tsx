"use client";
import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Stagger animation observer
    const staggerEls = document.querySelectorAll('.stagger-children');
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    staggerEls.forEach((el) => staggerObserver.observe(el));

    // Clip-path image reveals
    const clipEls = document.querySelectorAll('.clip-reveal');
    const clipObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            clipObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    clipEls.forEach((el) => clipObserver.observe(el));

    return () => {
      staggerObserver.disconnect();
      clipObserver.disconnect();
    };
  }, []);

  return null;
}
