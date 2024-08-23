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
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { Line, Doughnut } from "react-chartjs-2";

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

interface ChartProps {
  dataList?: Array<number>;
  labels?: Array<string>;
  dataLabel: string;
}

export const LineChart = ({ labels, dataList, dataLabel }: ChartProps) => {
  const { theme } = useTheme();
  const colors = useMemo(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return {
        gridColor: isDark ? "#afafaf" : "#ebebeb",
        ticksColor: isDark ? "#FFFFFF" : "#6d6d6d",
      };
    }
    return {
      gridColor: theme === "dark" ? "#afafaf" : "#ebebeb",
      ticksColor: theme === "dark" ? "#FFFFFF" : "#6d6d6d",
    };
  }, [theme]);
  const { gridColor, ticksColor } = colors;

  return (
    <div className="rounded-2xl bg-cusbanana dark:bg-cusdarkbanana shadow-border p-2 basis-1/2 flex-1 w-full min-h-[23.16vw] flex items-center justify-center animate-float-2">
      {dataList && labels ? (
        <Line
          options={{
            responsive: true,
            scales: {
              x: {
                grid: {
                  color: gridColor,
                },
                ticks: {
                  color: ticksColor,
                },
              },
              y: {
                grid: {
                  color: gridColor,
                },
                ticks: {
                  color: ticksColor,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
                title: {
                  color: ticksColor,
                },
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.dataset.data[context.dataIndex]} kcal`;
                  },
                },
              },
            },
          }}
          data={{
            labels,
            datasets: [
              {
                type: "line",
                label: dataLabel,
                data: dataList,
                borderColor: "#52e0c8",
                backgroundColor: "#52e0c8",
                tension: 0.2,
              },
            ],
          }}
        />
      ) : null}
    </div>
  );
};

export const DoughnutChart = ({
  dataLabel,
  dataList,
  labels,
  colors,
}: ChartProps & { colors?: string[] }) => {
  return (
    <div className="rounded-2xl bg-cusbanana dark:bg-cusdarkbanana shadow-border pt-11 pb-6 px-7 md:pt-0 md:pb-0 md:px-0 basis-1/2 flex-1 w-full min-h-[23.16vw] flex flex-col md:flex-row items-center justify-center animate-float-2 gap-[5%]">
      {dataList && labels && colors ? (
        <>
          <div className="md:w-5/12 w-8/12 relative">
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl"
              title="kcal"
            >
              {dataList.reduce((a, b) => a + b).toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col justify-around md:justify-center h-full basis-28 w-3/4 md:w-max md:basis-[200px] flex-shrink py-2">
            {labels.map((label, i) => (
              <DataLened key={label + i} label={label} value={dataList[i]} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

const DataLened = ({ label, value }: { label: string; value: number }) => {
  const dotColor =
    label === "탄수화물"
      ? "bg-carbs"
      : label === "단백질"
      ? "bg-protein"
      : label === "지방"
      ? "bg-fat"
      : "bg-etc";
  return (
    <div className="flex items-center gap-3 w-full">
      <div className={"rounded-full h-3 w-3 " + dotColor}></div>
      <div className="flex flex-1 items-center justify-between w-full h-full">
        <p className="flex-1">{label}</p>
        <p>{value} kcal</p>
      </div>
    </div>
  );
};
