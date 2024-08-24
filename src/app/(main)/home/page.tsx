"use client";

import { MAIN_LABELS } from "@/constants/mainConstants";
import { errorAlert } from "@/utils/alertFns";
import { customFetch } from "@/utils/fetchClient";
import { storageSet } from "@/utils/storageFns";
import { toFetchTimeString } from "@/utils/timestamp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Section from "./Section";
import Table from "../_components/Table";
import AvgCardList from "./AvgCardList";

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

export interface SimpleCalory {
  id: number;
  time: string;
  type: number;
  total: number;
}
export interface SimpleCaloryResponse {
  [key: string]: SimpleCalory[];
}

export default function Home() {
  const [mainData, setMainData] = useState<MainData>();
  const [simpleCalory, setSimpleCalory] = useState<
    Array<SimpleCalory & { empty: boolean }>
  >([]);
  const router = useRouter();

  useEffect(() => {
    customFetch
      .get<MainData>("main/home")
      .then((res) => {
        if (res.body.code === 0) {
          setMainData(res.body.data);
          storageSet("sud", res.body.data.date);
          const time = toFetchTimeString(new Date());
          customFetch
            .get<SimpleCaloryResponse>("meal/search", { type: 1, time })
            .then((res) => {
              if (res.body.code === 0) {
                const data = res.body.data[time.split(" ")[0]].map((item) => ({
                  ...item,
                  empty: false,
                }));
                setSimpleCalory(data);
              }
            });
          return res.body.data;
        }
      })
      .catch((e) => {
        errorAlert("데이터 요청에 실패 했습니다.", "", () => {
          router.refresh();
        });
      });
  }, []);

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
          <Section titleHeader="나의 데이터" className="animate-float">
            <AvgCardList avgDatas={mainData.user} avgTitles={userAvg} />
          </Section>
          <div className="w-ful md:flex flex-row gap-2 animate-float-2">
            <Section titleHeader="동일 연령대 평균 데이터">
              <AvgCardList
                avgDatas={mainData.avg}
                avgTitles={avg}
                clasName="overflow-x-scroll scroll-hide"
              />
            </Section>
          </div>
          <Section className="flex-1 flex flex-col gap-2 animate-float-4">
            <div className="w-full flex gap-3 flex-col sm:flex-row sm:items-center">
              <p className="w-max text-lg">오늘 식단 목록</p>
              <Link
                href={"/mealplan/add"}
                className="rounded-2xl text-center sm:rounded-xl shadow-border bg-cuspoint text-cusorange sm:p-2 p-4 w-full sm:w-max"
              >
                식단 추가하기
              </Link>
            </div>
            <Table
              tHead={"시간"}
              tclassName="flex-1 flex flex-col justify-between"
              tDataList={simpleCalory}
              period="day"
            />
          </Section>
        </>
      )}
    </div>
  );
}

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
            ? "bg-cusyellow dark:bg-dcusyellow sm:border-r-4 sm:border-l-4 sm:border-cusyellow sm:rounded-none sm:bg-inherit dark:sm:bg-inherit sm:h-6 "
            : "bg-cuspink dark:bg-dcuspink ") +
          `h-11 rounded-xl relative flex justify-center items-center`
        }
        style={{ width: `${percent}%` }}
      >
        {isAmr && (
          <span className=" hidden sm:block w-full bg-cusyellow dark:bg-dcusyellow h-2"></span>
        )}
        <span
          className={
            "point-value w-max " +
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
