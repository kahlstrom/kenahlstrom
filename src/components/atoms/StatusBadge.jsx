export default function StatusBadge({ status, className = "" }) {
  const statusStyles = {
    ACTIVE: "bg-green-400/20 text-green-400",
    DEPLOYED: "bg-blue-400/20 text-blue-400"
  };

  return (
    <span className={`px-2 py-1 text-xs font-mono rounded ${statusStyles[status] || statusStyles.DEPLOYED} ${className}`}>
      {status}
    </span>
  );
}
