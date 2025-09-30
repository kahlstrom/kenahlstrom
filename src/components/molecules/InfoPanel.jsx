export default function InfoPanel({ title, items, borderColor = "border-transparent", titleColor = "text-amber-900" }) {
  return (
    <div className="border-0">
      <h3 className={`${titleColor} font-mono text-lg font-bold mb-3`}>{title}</h3>
      <ul className="text-gray-800 text-sm space-y-2 font-mono">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-amber-700">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
