interface DataCardProps {
  className: string;
  label: string;
  value: number;
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
    <div
      className={`flex sm:flex-col bg-cusbanana shadow-border rounded-xl ${className}`}
    >
      <div className={"flex justify-center items-center " + (labelClass ?? "")}>
        <p>{label}</p>
      </div>
      <div
        onClick={handleClick}
        className={"flex justify-center items-center " + (valueClass ?? "")}
      >
        <p>{value.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DataCard;
