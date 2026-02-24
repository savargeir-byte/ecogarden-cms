// ── TÍMABUNDINN HJÁLPARI — hægt að eyða þessum skrá og öllum <EditBadge> tögum þegar þörf er liðin ──
// Badge is hidden by default; becomes visible when <body> has class "edit-mode"
// (toggled by the floating EditToggle button)
export default function EditBadge({ n }: { n: number | string }) {
  return (
    <div
      className="edit-badge"
      aria-hidden="true"
      style={{
        display: 'none',
        position: 'relative',
        zIndex: 9999,
        background: '#16a34a',
        color: 'white',
        fontWeight: 900,
        fontSize: '15px',
        borderRadius: '6px',
        padding: '4px 14px',
        fontFamily: 'monospace',
        boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
        userSelect: 'none',
        margin: '6px 0',
        width: 'fit-content',
        lineHeight: 1.6,
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
      }}
    >
      [{n}]
    </div>
  );
}
