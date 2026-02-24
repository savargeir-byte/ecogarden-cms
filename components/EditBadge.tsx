'use client';
// ── TÍMABUNDINN HJÁLPARI — hægt að eyða þessum skrá og öllum <EditBadge> tögum þegar þörf er liðin ──
import { useEffect, useState } from 'react';

export default function EditBadge({ n }: { n: number | string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(new URLSearchParams(window.location.search).get('edit') === '1');
  }, []);

  if (!show) return null;

  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 6,
        left: 6,
        zIndex: 9999,
        background: '#16a34a',
        color: 'white',
        fontWeight: 800,
        fontSize: '12px',
        borderRadius: '6px',
        padding: '3px 8px',
        fontFamily: 'monospace',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1.5,
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
      }}
    >
      [{n}]
    </span>
  );
}
