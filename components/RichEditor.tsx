"use client";

// Simple textarea fallback - replace with TipTap or other React 19 compatible editor later
export default function RichEditor({ value, onChange }: any) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-h-[200px] p-3 border rounded-lg bg-white"
      placeholder="Enter content..."
    />
  );
}
