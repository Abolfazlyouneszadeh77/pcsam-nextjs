export const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="text-slate-400 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-slate-800 dark:text-white font-medium">{value}</p>
    </div>
  </div>
);