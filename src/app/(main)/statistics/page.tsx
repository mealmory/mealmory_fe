"use client";

import useDate from "@/store/selectDateStore";
import { customFetch } from "@/utils/fetchClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Podium from "./Podium";
import { DoughnutChart, LineChart } from "./Chart";
import { SimpleCalory, SimpleCaloryResponse } from "../home/page";
import {
  genStartEndDate,
  toFetchTimeString,
  toMMddString,
  toyyMMddString,
} from "@/utils/timeFns";
import { storageRemove, storageSet } from "@/utils/storageFns";
import Table from "../_components/Table";
import { compareDate } from "@/app/(sub)/util";

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

function transCPFKey(cfpKey: CPFKey) {
  if (cfpKey === "carbs") return "탄수화물";
  if (cfpKey === "protein") return "단백질";
  if (cfpKey === "fat") return "지방";
  return "기타";
}

function transGramOrKcal(
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
  const { selectedDate, changeDate, period } = useDate();
  const [statisticsData, setStatisticsData] = useState<StatisticsData>();
  const router = useRouter();
  const notToday = !compareDate(new Date(), selectedDate).same;

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
    if (notToday) {
      const date = selectedDate.toLocaleDateString().replaceAll(". ", "-");
      const type = period === "day" ? 1 : period === "week" ? 2 : 3;
      customFetch
        .get<StatisticsData>("stat", {
          type,
          date: date.substring(0, date.length - 1),
        })
        .then((res) => {
          if (res.body.code === 0) {
            setStatisticsData(res.body.data);
          } else {
            setStatisticsData(undefined);
          }
        });
    }
    return () => {
      notToday && setStatisticsData(undefined);
    };
  }, [selectedDate, period, notToday]);

  function genMealChartProps(dataLabel: "칼로리 섭취량" | "탄단지 섭취량") {
    let labels: string[] | undefined = [],
      dataList: number[] | undefined = [],
      colors: string[] | undefined = [];
    if (dataLabel === "칼로리 섭취량") {
      if (statisticsData) {
        Object.entries(statisticsData.dailyGraph).forEach(([key, value]) => {
          labels && labels.push(key.substring(5, key.length));
          dataList && dataList.push(value);
        });
      } else {
        if (period === "day") {
          labels = [toFetchTimeString(selectedDate)[0]];
          dataList = [0];
        } else if (period === "week") {
          const startDayOfWeek = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate() - selectedDate.getDay()
          );
          for (let i = 0; i < 7; i++) {
            labels.push(toMMddString(startDayOfWeek));
            dataList.push(0);
            startDayOfWeek.setDate(startDayOfWeek.getDate() + 1);
          }
        } else {
          const startDayOfMonth = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
          );
          const startDayOfNextMonth = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            1
          );
          const endDayOfMonth = new Date(startDayOfNextMonth.getTime() - 1);
          for (let i = 0; i < endDayOfMonth.getDate(); i++) {
            labels && labels.push(toMMddString(startDayOfMonth));
            dataList && dataList.push(0);
            startDayOfMonth.setDate(startDayOfMonth.getDate() + 1);
          }
        }
        colors = undefined;
      }
    } else {
      if (statisticsData) {
        Object.entries(statisticsData.cpfGraph).forEach(([key, value]) => {
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
        });
      } else {
        labels = ["데이터 없음"];
        dataList = [1];
        colors = [genDoughnutColor("calory")];
      }
    }
    return {
      dataLabel,
      labels,
      dataList,
      colors,
    };
  }
  const periodText =
    period === "day" ? "하루" : period === "week" ? "일주일" : "한달";
  const dateRange = genStartEndDate(selectedDate, period);
  return (
    <div className="flex flex-col w-full h-full min-h-screen p-2 md:p-5 gap-9 md:gap-6">
      <div className="flex flex-col w-full gap-2 md:flex-row md:w-max items-center">
        {/* date, range */}
        <button
          onClick={() =>
            router.push("/calendar/with-period", { scroll: false })
          }
          className="p-3 px-4 bg-cuspoint shadow-border rounded-2xl flex items-center gap-3"
        >
          <p className="underline text-cusorange">
            {toyyMMddString(selectedDate)}
          </p>
          <p className="text-sm">{periodText}</p>
        </button>
        {period !== "day" && dateRange && (
          <p>{`${toyyMMddString(dateRange.startDate)} ~ ${toyyMMddString(
            dateRange.endDate
          )}`}</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 h-max">
        {/* ranking, chart */}

        <Podium rank={statisticsData?.rank} />
        {period !== "day" && (
          <LineChart {...genMealChartProps("칼로리 섭취량")} />
        )}
        <DoughnutChart {...genMealChartProps("탄단지 섭취량")} />
      </div>
      <MealTable notToday={notToday} />
    </div>
  );
}

const MealTable = ({ notToday }: { notToday: boolean }) => {
  const { selectedDate, period } = useDate();
  const [tableData, setTableData] = useState<
    Array<SimpleCalory & { empty: boolean }>
  >([]);
  useEffect(() => {
    notToday &&
      customFetch
        .get<SimpleCaloryResponse>("meal/search", {
          type: period === "day" ? 1 : period === "week" ? 2 : 3,
          time: toFetchTimeString(selectedDate),
        })
        .then((res) => {
          if (res.body.code === 0) {
            if (period === "day") {
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
    return () => {
      setTableData([]);
    };
  }, [selectedDate, period, notToday]);

  const tDataList = tableData?.map((item) => ({ ...item, empty: false }));

  return tDataList ? (
    <Table
      tHead={period === "day" ? "시간" : "날짜"}
      tDataList={tDataList}
      period={period}
      tclassName="flex-1 flex flex-col justify-between animate-float-3"
    />
  ) : (
    <div className="flex-1 w-full h-full overflow-hidden shadow-border rounded-xl bg-cusbanana dark:bg-cusdarkbanana"></div>
  );
};
