import { checkBmi } from "@/utils/checkBmi";

interface AvgCardList<T> {
  avgDatas: { [key in keyof T]: number };
  avgTitles: T;
  clasName?: string;
}

const AvgCardList = <T extends {}>({
  avgDatas,
  avgTitles,
  clasName,
}: AvgCardList<T>) => {
  return (
    <div className={"flex items-center gap-2 p-1 " + (clasName ?? "")}>
      {Object.keys(avgTitles).map((key) => {
        const target = key as keyof typeof avgTitles;
        let value = avgDatas[target].toLocaleString();
        let valueClass = "point-value";
        if (target === "bmi") {
          const { text, status } = checkBmi(avgDatas[target]);
          value += ` | ${text}`;
          valueClass =
            status === "less"
              ? "text-bmiLess dark:text-dbmiLess"
              : status === "safe"
              ? "text-bmiSafe dark:text-dbmiSafe"
              : status === "warning"
              ? "text-bmiWarning dark:text-dbmiWarning"
              : status === "danger"
              ? "text-bmiDanger dark:text-dbmiDanger"
              : "point-value";
        } else if (target === "bmr") {
          value += " kcal";
        } else if (target === "weight") {
          value += " kg";
        }
        return (
          <AvgDataCard
            key={key}
            label={avgTitles[target] as string}
            value={value}
            className="basis-36 flex-grow flex-shrink-0 flex-col p-2 h-40 gap-3 justify-center items-center rounded-xl"
            valueClass={valueClass}
          />
        );
      })}
    </div>
  );
};

export default AvgCardList;

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

      <p className={"text-xl " + (valueClass ?? "")}>{value}</p>
    </div>
  );
};
