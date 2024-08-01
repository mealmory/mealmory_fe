"use client";

import AvgDataCard from "@/components/main/AvgDataCard";
import Section from "@/components/main/Section";
import Table from "@/components/main/Table";
import { MAIN_LABELS } from "@/constants/mainConstants";
import { errorAlert } from "@/utils/alertFns";
import { checkBmi } from "@/utils/checkBmi";
import { fetcher } from "@/utils/fetchClient";
import { getTimestamp } from "@/utils/timestamp";
import { useEffect, useState } from "react";

interface MainData {
  avg: {
    bmi: number;
    bmr: number;
    height: number;
    weight: number;
  };
  user: {
    total: number;
    height: number;
    weight: number;
    bmi: number;
    bmr: number;
    amr: number;
  };
  date: string;
}

export default function Home() {
  const [mainData, setMainData] = useState<MainData>();
  useEffect(() => {
    fetcher<MainData>(
      "main/home?" +
        new URLSearchParams({ timestamp: getTimestamp().toString() }),
      { method: "GET" }
    )
      .then((res) => {
        if (res.body.code === 0) {
          setMainData(res.body.data);
          sessionStorage.setItem("sud", res.body.data.date);
          return res.body.data;
        }
        throw new Error("데이터 요청 실패");
      })
      .catch((e) => {
        errorAlert("데이터를 요청에 실패 했습니다.", "", () => {});
      });
  }, []);

  const mealPlanList = [
    { id: 0, time: "08:00", calory: 21134, empty: false },
    { id: 1, time: "09:00", calory: 21134, empty: false },
    { id: 2, time: "10:00", calory: 21134, empty: false },
    { id: 3, time: "11:00", calory: 21134, empty: false },
    { id: 4, time: "12:00", calory: 21134, empty: false },
    { id: 5, time: "13:00", calory: 21134, empty: false },
  ];

  const { caloryData, avg, userAvg } = MAIN_LABELS;

  return (
    <div className="w-full min-h-screen h-max p-2 flex flex-col gap-10 overflow-visible">
      {mainData && (
        <>
          <Section>
            {Object.keys(caloryData).map((key) => {
              const target = key as keyof typeof caloryData;
              const percent =
                target === "amr"
                  ? 100
                  : (mainData.user.total / mainData.user.amr) * 100;
              return (
                <CaloryBar
                  key={target}
                  label={caloryData[target]}
                  percent={percent}
                  calory={mainData.user[target]}
                />
              );
            })}
          </Section>
          <Section titleHeader="나의 데이터">
            <AvgCardList avgDatas={mainData.user} avgTitles={userAvg} />
          </Section>
          <div className="w-ful md:flex flex-row gap-2">
            <Section titleHeader="동일 연령대 평균 데이터">
              <AvgCardList
                avgDatas={mainData.avg}
                avgTitles={avg}
                clasName="overflow-x-scroll scroll-hide"
              />
            </Section>
          </div>
          <Section
            titleHeader="오늘 식단 목록"
            className="flex-1 flex flex-col gap-2"
          >
            <Table
              tHead={"시간"}
              tclassName="flex-1 flex flex-col justify-between"
              tDataList={mealPlanList}
              period="day"
            />
          </Section>
        </>
      )}
    </div>
  );
}

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
              ? "text-bmiLess"
              : status === "safe"
              ? "text-bmiSafe"
              : status === "warning"
              ? "text-bmiWraning"
              : status === "danger"
              ? "text-bmiDanger"
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

const CaloryBar = ({
  percent,
  label,
  calory,
}: {
  percent: number;
  label: string;
  calory: number;
}) => {
  const isAmr = label !== "현재까지 섭취 칼로리";
  return (
    <div className="w-full">
      <p>{label}</p>
      <div
        className={
          (isAmr
            ? "bg-cusyellow sm:border-r-4 sm:border-l-4 sm:border-cusyellow sm:rounded-none sm:bg-inherit sm:h-6 "
            : "bg-cuspink ") +
          `h-11 rounded-xl relative flex justify-center items-center`
        }
        style={{ width: `${percent}%` }}
      >
        {isAmr && (
          <span className=" hidden sm:block w-full bg-cusyellow h-2"></span>
        )}
        <span
          className={
            "point-value" +
            (isAmr
              ? " sm:absolute sm:right-2 sm:-top-5"
              : percent < 50
              ? " absolute -right-1 top-1/2 translate-x-full -translate-y-1/2 "
              : "")
          }
        >
          {calory.toLocaleString()} kcal
        </span>
      </div>
    </div>
  );
};
