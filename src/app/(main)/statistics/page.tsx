"use client";

import useDate from "@/store/selectDateStore";
import { customFetch } from "@/utils/fetchClient";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Table from "@/components/main/Table";
import Podium from "./Podium";
import { DoughnutChart, LineChart } from "./Chart";
import { SimpleCalory, SimpleCaloryResponse } from "../home/page";
import { toFetchTimeString } from "@/utils/timestamp";
import { storageRemove, storageSet } from "@/utils/storageFns";

export type CharName = "보통" | "과식" | "소식";

interface StatisticsData {
  rank: {
    [key: number]: CharName;
  };
  cpfGraph: {
    carbs: number;
    protein: number;
    fat: number;
    calory: number;
  };
  dailyGraph: {
    [key: string]: number;
  };
}

export type CPFKey = "carbs" | "protein" | "fat" | "calory";

export function transCPFKey(cfpKey: CPFKey) {
  if (cfpKey === "carbs") return "탄수화물";
  if (cfpKey === "protein") return "단백질";
  if (cfpKey === "fat") return "지방";
  return "기타";
}

export function transGramOrKcal(
  value: number,
  type: Exclude<CPFKey, "calory">,
  toKcal: boolean
) {
  // 1g 당 탄수화물 4kcal, 단백질 4kcal, 지방 9kcal

  if (toKcal) {
    switch (type) {
      case "carbs":
        return value * 4;
      case "protein":
        return value * 4;
      case "fat":
        return value * 9;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "carbs":
        return value / 4;
      case "protein":
        return value / 4;
      case "fat":
        return value / 9;
      default:
        return value;
    }
  }
}

function genDoughnutColor(label: CPFKey) {
  switch (label) {
    case "carbs":
      return "#6CFD8C" as const;
    case "protein":
      return "#2FB4FF" as const;
    case "fat":
      return "#FBD925" as const;
    default:
      return "#D3D3D3" as const;
  }
}
export default function StatisticsPage() {
  const { selectedDate, changeDate } = useDate();
  const [selectedRange, setSelectedRange] = useState<1 | 7 | 30>(1);
  const [statisticsData, setStatisticsData] = useState<StatisticsData>();
  const router = useRouter();
  useEffect(() => {
    storageSet("max", "1");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    changeDate(yesterday);
    return () => {
      storageRemove("max");
    };
  }, []);

  useEffect(() => {
    const date = selectedDate.toLocaleDateString().replaceAll(". ", "-");
    const type = selectedRange === 1 ? 1 : selectedRange === 7 ? 2 : 3;
    customFetch
      .get<StatisticsData>("stat", {
        type,
        date: date.substring(0, date.length - 1),
      })
      .then((res) => {
        if (res.body.code === 0) {
          setStatisticsData(res.body.data);
        }
      });
    return () => {
      setStatisticsData(undefined);
    };
  }, [selectedDate, selectedRange]);

  function genMealChartProps(dataLabel: "칼로리 섭취량" | "탄단지 섭취량") {
    let labels: string[] | undefined = [],
      dataList: number[] | undefined = [],
      colors: string[] | undefined = [];
    if (dataLabel === "칼로리 섭취량") {
      statisticsData
        ? Object.entries(statisticsData.dailyGraph).forEach(([key, value]) => {
            labels && labels.push(key.substring(5, key.length));
            dataList && dataList.push(value);
          })
        : ((labels = undefined), (dataList = undefined), (colors = undefined));
    } else {
      statisticsData
        ? Object.entries(statisticsData.cpfGraph).forEach(([key, value]) => {
            labels && labels.push(transCPFKey(key as CPFKey));
            dataList &&
              dataList.push(
                key === "calory"
                  ? value
                  : +transGramOrKcal(
                      value,
                      key as Exclude<CPFKey, "calory">,
                      true
                    ).toFixed(2)
              );
            colors && colors.push(genDoughnutColor(key as CPFKey));
          })
        : ((labels = undefined), (dataList = undefined), (colors = undefined));
    }
    return {
      dataLabel,
      labels,
      dataList,
      colors,
    };
  }

  return (
    <div className="w-full min-h-screen h-full p-2 md:p-5 flex flex-col gap-9 md:gap-6">
      <div className="flex flex-col md:flex-row gap-6 w-full md:w-max">
        {/* date, range */}
        <div className="flex items-center w-full md:w-[280px] bg-cuspoint shadow-border rounded-2xl overflow-hidden px-2 py-1 md:gap-3">
          {[1, 7, 30].map((value) => {
            const text =
              value === 1 ? "하루" : value === 7 ? "지난 7일" : "지난 30일";
            const isSelected = value === selectedRange;
            return (
              <button
                className={
                  "p-2 basis-[80px] flex-1 " +
                  (isSelected ? "text-cusorange bg-black bg-opacity-5" : "")
                }
                key={value}
                onClick={() => setSelectedRange(value as 1 | 7 | 30)}
              >
                {text}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => router.push("/calendar", { scroll: false })}
          className="bg-cuspoint shadow-border text-cusorange underline rounded-2xl p-3"
        >
          {selectedDate.toLocaleDateString()}
        </button>
      </div>
      <div
        // className="flex flex-col md:flex-row items-center w-full gap-5 h-max"
        className="grid grid-cols-1 md:grid-cols-2 gap-5 h-max"
      >
        {/* ranking, chart */}

        <Podium rank={statisticsData?.rank} period={selectedRange} />
        {selectedRange !== 1 && (
          <LineChart {...genMealChartProps("칼로리 섭취량")} />
        )}
        <DoughnutChart {...genMealChartProps("탄단지 섭취량")} />
      </div>
      <MealTable range={selectedRange} />
    </div>
  );
}

const MealTable = ({ range }: { range: 1 | 7 | 30 }) => {
  const { selectedDate } = useDate();
  const [tableData, setTableData] = useState<
    Array<SimpleCalory & { empty: boolean }>
  >([]);
  useEffect(() => {
    customFetch
      .get<SimpleCaloryResponse>("meal/search", {
        type: range === 1 ? 1 : range === 7 ? 2 : 3,
        time: toFetchTimeString(selectedDate),
      })
      .then((res) => {
        if (res.body.code === 0) {
          if (range === 1) {
            const key = toFetchTimeString(selectedDate).split(" ")[0];
            const data = res.body.data[key].map((item) => ({
              ...item,
              empty: false,
            }));
            setTableData(data);
          } else {
            const data = Object.values(res.body.data)
              .map((value) => {
                if (value.length > 0) {
                  const result = value.reduce((a, b) => ({
                    ...a,
                    total: a.total + b.total,
                  }));
                  return { ...result, empty: false };
                }
                return;
              })
              .filter((item) => item !== undefined);
            setTableData(data);
          }
        }
      });
  }, [selectedDate, range]);

  const tDataList = tableData?.map((item) => ({ ...item, empty: false }));
  const period = useMemo(() => {
    if (range === 1) return "day";
    if (range === 7) return "week";
    return "month";
  }, [range]);
  return tDataList ? (
    <Table
      tHead={range === 1 ? "시간" : "날짜"}
      tDataList={tDataList}
      period={period}
      tclassName="flex-1 flex flex-col justify-between animate-float-3"
    />
  ) : (
    <div className="w-full h-full shadow-border rounded-xl bg-cusbanana dark:bg-cusdarkbanana overflow-hidden flex-1"></div>
  );
};
