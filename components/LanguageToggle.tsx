export default function LanguageToggle({ lang, setLang }: any) {
  return (
    <div className="flex gap-2">
      {["is", "en", "de"].map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded border ${
            lang === l ? "bg-black text-white" : ""
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
