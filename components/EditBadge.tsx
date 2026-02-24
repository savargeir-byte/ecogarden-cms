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
    <div
      aria-hidden="true"
      style={{
        display: 'block',
        background: '#16a34a',
        color: 'white',
        fontWeight: 900,
        fontSize: '14px',
        borderRadius: '6px',
        padding: '4px 12px',
        fontFamily: 'monospace',
        boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
        pointerEvents: 'none',
        userSelect: 'none',
        margin: '4px 0',
        width: 'fit-content',
        lineHeight: 1.5,
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
      }}
    >
      [{n}]
    </div>
  );
}
