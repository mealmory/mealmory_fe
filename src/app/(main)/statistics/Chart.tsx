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
  dataList: Array<string | number>;
  labels: Array<string>;
  dataLabel: string;
  color: string;
  line?: boolean;
}

const Chart = ({ labels, dataList, dataLabel, color, line }: ChartProps) => {
  return (
    <div className="rounded-2xl bg-cusbanana shadow-border p-2 basis-1/2 flex-1 min-h-[23.16vw] flex items-center justify-center">
      {line ? (
        <Line
          options={{
            responsive: true,
            scales: {
              x: {},
            },
            plugins: {
              legend: {
                display: true,
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
                borderColor: color,
                backgroundColor: color,
                tension: 0.2,
              },
            ],
          }}
        />
      ) : (
        <Doughnut
          options={{
            indexAxis: "y",
            elements: {
              bar: {
                borderWidth: 1,
              },
            },
            responsive: true,
            scales: {
              x: {
                ticks: {
                  stepSize: 1,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `${context.label} : ${context.formattedValue}`;
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
                backgroundColor: color,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default Chart;

// export const genLineProps = (labels, dataList, dataLabel, color) => {
//   const { borderColor } = color;
//   return {
//     data: {
//       labels,
//       datasets: [
//         {
//           type: "line",
//           label: dataLabel,
//           data: dataList,
//           borderColor,
//           tension: 0.2,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maxBarThickness: 80,
//       scales: {
//         y: {
//           ticks: {
//             stepSize: 1,
//           },
//         },
//       },
//       plugins: {
//         legend: {
//           display: false,
//         },
//         datalabels: {
//           display: false,
//           anchor: "center",
//           align: "center",
//           clip: true,
//           color: "#000000",
//           backgroundColor: "#ffffff95",
//           font: {
//             size: 20,
//             weight: 500,
//           },
//         },
//         tooltip: {
//           reverse: true,
//           callbacks: {
//             title: (context) => context.dataset,
//             label: (context) => {
//               return `${context.dataset.label} : ${
//                 context.dataset.data[context.dataIndex]
//               } kcal`;
//             },
//           },
//         },
//       },
//     },
//     mul: true,
//   };
// };

// export const genDoughtnutProps = (labels, dataList, colors) => {
//   return {
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: labels,
//           data: dataList,
//           backgroundColor: colors,
//         },
//       ],
//     },
//     options: {
//       indexAxis: "y",
//       maxBarThickness: 50,
//       elements: {
//         bar: {
//           borderWidth: 1,
//         },
//       },
//       responsive: true,
//       scales: {
//         x: {
//           ticks: {
//             stepSize: 1,
//           },
//         },
//       },
//       plugins: {
//         legend: {
//           display: false,
//         },
//         tooltip: {
//           reverse: true,
//           callbacks: {
//             label: (context) => {
//               return `${context.label} : ${context.formattedValue}`;
//             },
//           },
//         },
//       },
//     },
//   };
// };
