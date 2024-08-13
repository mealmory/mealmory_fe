"use client";

import useDate from "@/store/selectDateStore";
import { customFetch, fetchServer } from "@/utils/fetchClient";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Table from "@/components/main/Table";
import Podium from "./Podium";
import Chart from "./Chart";
import { SimpleCalory, SimpleCaloryResponse } from "../home/page";
import { toFetchTimeString } from "@/utils/timestamp";

interface StatisticsData {
  rank: {
    [key: number]: "fat" | "normal" | "skinny";
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

export default function StatisticsPage() {
  const { selectedDate, changeDate } = useDate();
  const [selectedRange, setSelectedRange] = useState<1 | 7 | 30>(1);
  const [statisticsData, setStatisticsData] = useState<StatisticsData>();
  const router = useRouter();
  useEffect(() => {
    typeof window !== "undefined" && localStorage.setItem("max", "1");
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    changeDate(yesterday);
    return () => {
      typeof window !== "undefined" && localStorage.removeItem("max");
    };
  }, []);
  useEffect(() => {
    const date = selectedDate.toLocaleDateString().replaceAll(". ", "-");
    fetchServer<StatisticsData>(
      "dummy/statistics?" +
        new URLSearchParams({
          date: date.substring(0, date.length - 1),
          type: "1",
        }),
      { method: "GET" }
    )
      .then((res) => res.body)
      .then((data) => setStatisticsData(data.data));
    return () => {};
  }, [selectedDate, selectedRange]);

  return (
    <div className="w-full min-h-screen h-full p-2 sm:p-5 flex flex-col gap-9">
      <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-max">
        {/* date, range */}
        <div className="flex items-center w-full sm:w-[280px] bg-cuspoint shadow-border rounded-2xl overflow-hidden px-2 py-1 sm:gap-3">
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
      <div className="flex flex-col sm:flex-row items-center w-full gap-5 h-max">
        {/* ranking, chart */}

        <Podium rank={statisticsData?.rank} period={selectedRange} />
        <Chart
          dataLabel="칼로리 섭취량"
          labels={
            statisticsData
              ? Object.keys(statisticsData.dailyGraph).map((value) =>
                  value.substring(5, value.length)
                )
              : undefined
          }
          dataList={
            statisticsData
              ? Object.values(statisticsData.dailyGraph)
              : undefined
          }
          color={"#52e0c8"}
          line
        />
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
      tclassName="flex-1 flex flex-col justify-between"
    />
  ) : (
    <div className="w-full h-full shadow-border rounded-xl bg-cusbanana dark:bg-cusdarkbanana overflow-hidden flex-1"></div>
  );
};
