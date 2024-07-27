interface DataCardProps {
  className: string;
  label: string;
  value: string;
  labelClass?: string;
  valueClass?: string;
}

const AvgDataCard = ({
  className,
  label,
  value,
  labelClass,
  valueClass,
}: DataCardProps) => {
  return (
    <div
      className={`flex bg-cusbanana dark:bg-cusdarkbanana text-center shadow-border ${className}`}
    >
      <p className={"-translate-y-4 " + (labelClass ?? "")}>{label}</p>

      <p className={valueClass ?? ""}>{value}</p>
    </div>
  );
};

export default AvgDataCard;
