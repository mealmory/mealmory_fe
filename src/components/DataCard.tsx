interface DataCardProps {
  className: string;
  label: string;
  value: string;
  labelClass?: string;
  valueClass?: string;
  handleClick?: () => void;
}

const DataCard = ({
  className,
  label,
  value,
  labelClass,
  valueClass,
  handleClick,
}: DataCardProps) => {
  return (
    <div className={`flex bg-cusbanana shadow-border ${className}`}>
      <div className={"flex justify-center items-center " + (labelClass ?? "")}>
        <p>{label}</p>
      </div>
      <div
        onClick={handleClick}
        className={"flex justify-center items-center " + (valueClass ?? "")}
      >
        <p>{value}</p>
      </div>
    </div>
  );
};

export default DataCard;
