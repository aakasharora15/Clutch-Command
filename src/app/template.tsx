"use client";

import React, { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Avoid synchronous setState in effect, wrap in a timeout or microtask if needed
    // However, if we just want to mark as mounted, we can just do it:
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-transition ${isMounted ? 'entered' : 'entering'}`}>
      {children}
    </div>
  );
}
