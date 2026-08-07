import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
}

export default function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <>
      <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>{eyebrow}</div>
      <h2 className="section-header">{title}</h2>
    </>
  );
}
