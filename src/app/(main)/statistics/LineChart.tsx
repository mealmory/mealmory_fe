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
import { Line } from "react-chartjs-2";
import { ChartPropsType } from "./ChartType";
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

export const LineChart = ({ labels, dataList, dataLabel }: ChartPropsType) => {
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
                min: 0,
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
