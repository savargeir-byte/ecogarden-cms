'use client';
// ── TÍMABUNDINN HJÁLPARI — má eyða þessum skrá þegar þörf er liðin ──
import { useEffect, useState } from 'react';

export default function EditToggle() {
  const [active, setActive] = useState(false);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('editMode') === '1';
    setActive(saved);
    document.body.classList.toggle('edit-mode', saved);
  }, []);

  const toggle = () => {
    const next = !active;
    setActive(next);
    document.body.classList.toggle('edit-mode', next);
    localStorage.setItem('editMode', next ? '1' : '0');
  };

  return (
    <button
      onClick={toggle}
      title="Kveikja/slökkva á breytingarnúmerum"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 99999,
        background: active ? '#16a34a' : '#374151',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        padding: '10px 18px',
        fontFamily: 'monospace',
        fontWeight: 900,
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'background 0.2s',
        userSelect: 'none',
      }}
    >
      {active ? '✕ Fela tölur' : '# Sýna tölur'}
    </button>
  );
}
