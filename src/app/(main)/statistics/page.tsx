"use client";

import useDate from "@/store/selectDateStore";
import { fetchClient } from "@/utils/fetchClient";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Table from "@/components/main/Table";
import dynamic from "next/dynamic";

const Podium = dynamic(() => import("./Podium"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 pt-[25.16%] rounded-2xl bg-cusbanana shadow-border">
      {" "}
    </div>
  ),
});
const Chart = dynamic(() => import("./Chart"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 pt-[25.16%] rounded-2xl bg-cusbanana shadow-border">
      {" "}
    </div>
  ),
});

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
  const { selectedDate, init } = useDate();
  const [selectedRange, setSelectedRange] = useState<1 | 7 | 30>(1);
  const [statisticsData, setStatisticsData] = useState<StatisticsData>();
  const router = useRouter();
  useEffect(() => {
    const date = selectedDate.toLocaleDateString().replaceAll(". ", "-");
    fetchClient<StatisticsData>(
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
      <div className="sm:flex gap-6">
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
      <div className="sm:flex items-center w-full gap-5 h-max">
        {/* ranking, chart */}
        {statisticsData?.rank && <Podium rank={statisticsData.rank} />}
        {statisticsData?.dailyGraph && (
          <Chart
            dataLabel="칼로리 섭취량"
            labels={Object.keys(statisticsData.dailyGraph).map((value) =>
              value.substring(5, value.length)
            )}
            dataList={Object.values(statisticsData.dailyGraph)}
            color={"#52e0c8"}
            line
          />
        )}
      </div>
      <MealTable range={selectedRange} />
    </div>
  );
}

const MealTable = ({ range }: { range: 1 | 7 | 30 }) => {
  const { selectedDate } = useDate();
  const [tableData, setTableData] =
    useState<Array<{ id: number; time: string; calory: number }>>();
  useEffect(() => {
    setTableData([
      {
        id: 0,
        time: "2024-04-12",
        calory: 12345,
      },
      {
        id: 1,
        time: "2024-04-13",
        calory: 12345,
      },
      {
        id: 2,
        time: "2024-04-14",
        calory: 12345,
      },
      {
        id: 3,
        time: "2024-04-15",
        calory: 12345,
      },
      {
        id: 4,
        time: "2024-04-16",
        calory: 12345,
      },
    ]);
  }, []);
  const tDataList = tableData?.map((item) => ({ ...item, empty: false }));
  const period = useMemo(() => {
    if (range === 1) return "day";
    if (range === 7) return "week";
    return "month";
  }, [range]);
  return tDataList ? (
    <Table
      tHead="날짜"
      tDataList={tDataList}
      period={period}
      tclassName="flex-1 flex flex-col justify-between"
    />
  ) : null;
};
