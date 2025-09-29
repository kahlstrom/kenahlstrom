export default function InfoPanel({ title, items, borderColor = "border-amber-400/30", titleColor = "text-amber-400" }) {
  return (
    <div className={`bg-slate-800/50 border ${borderColor} rounded p-4`}>
      <h3 className={`${titleColor} font-mono text-sm mb-2`}>{title}</h3>
      <ul className="text-gray-300 text-sm space-y-1 font-mono">
        {items.map((item, index) => (
          <li key={index}>→ {item}</li>
        ))}
      </ul>
    </div>
  );
}
