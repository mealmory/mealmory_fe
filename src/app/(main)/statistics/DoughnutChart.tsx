import { Doughnut } from "react-chartjs-2";
import { ChartPropsType } from "./ChartType";

import {
  Chart as ChartJS,
  LinearScale,
  ArcElement,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  DoughnutController,
  LineController,
} from "chart.js";

ChartJS.register(
  LinearScale,
  ArcElement,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  DoughnutController,
  LineController
);

export default function DoughnutChart({
  dataLabel,
  dataList,
  labels,
  colors,
}: ChartPropsType & { colors?: string[] }) {
  return (
    <div className="rounded-2xl bg-cusbanana dark:bg-cusdarkbanana shadow-border pt-11 pb-6 px-7 md:pt-0 md:pb-0 md:px-0 basis-1/2 flex-1 w-full min-h-[23.16vw] flex flex-col md:flex-row items-center justify-center animate-float-2 gap-[5%]">
      {dataList && labels && colors ? (
        <>
          <div className="relative w-8/12 md:w-5/12">
            <Doughnut
              options={{
                cutout: "70%",
                responsive: true,

                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.label} : ${context.formattedValue} kcal`;
                      },
                    },
                  },
                },
              }}
              data={{
                labels: labels,
                datasets: [
                  {
                    label: dataLabel,
                    data: dataList,
                    backgroundColor: colors,
                  },
                ],
              }}
            />
            <p
              className="absolute text-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              title="kcal"
            >
              {dataList.length > 1 &&
                dataList.reduce((a, b) => a + b).toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col justify-around md:justify-center h-full basis-28 w-3/4 md:w-max md:basis-[200px] flex-shrink py-2">
            {labels.map((label, i) => (
              <DataLened
                key={label + i}
                label={label}
                value={dataList[i]}
                nodata={labels.length === 1}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

const DataLened = ({
  label,
  value,
  nodata,
}: {
  label: string;
  value: number;
  nodata: boolean;
}) => {
  const dotColor =
    label === "탄수화물"
      ? "bg-carbs"
      : label === "단백질"
      ? "bg-protein"
      : label === "지방"
      ? "bg-fat"
      : "bg-etc";
  return (
    <div className="flex items-center w-full gap-3">
      <div className={"rounded-full h-3 w-3 " + dotColor}></div>
      <div className="flex items-center justify-between flex-1 w-full h-full">
        <p className="flex-1">{label}</p>
        {!nodata && (
          <p>
            <span className="point-value">{value}</span> kcal
          </p>
        )}
      </div>
    </div>
  );
};
