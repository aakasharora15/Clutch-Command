"use client";

import React, { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`page-transition ${isMounted ? 'entered' : 'entering'}`}>
      {children}
    </div>
  );
}
