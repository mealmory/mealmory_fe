import AvgDataCard from "@/components/main/AvgDataCard";
import Section from "@/components/main/Section";
import Table from "@/components/main/Table";
import { MAIN_LABELS } from "@/constants/mainConstants";
import { checkBmi } from "@/utils/checkBmi";
import { ReactNode } from "react";

export default async function Home() {
  const data = {
    user: {
      totalCalory: 1000,
      amr: 10000,
      bmi: 18,
      bmr: 124214,
    },
    avg: {
      bmi: 25,
      bmr: 12442,
      weight: 0,
    },
    date: "2024-04-28",
  };
  const mealPlanList = {
    [`08:00`]: 123455,
    [`09:00`]: 123455,
    [`10:00`]: 123455,
  };
  const { caloryData, avg, userAvg } = MAIN_LABELS;

  return (
    <div className="w-full min-h-screen h-max p-2 flex flex-col gap-10 overflow-visible">
      <Section>
        {Object.keys(caloryData).map((key) => {
          const target = key as keyof typeof caloryData;
          const percent =
            target === "amr"
              ? 100
              : (data.user.totalCalory / data.user.amr) * 100;
          return (
            <CaloryBar
              key={target}
              label={caloryData[target]}
              percent={percent}
              calory={data.user[target]}
            />
          );
        })}
      </Section>
      <Section titleHeader="나의 데이터">
        <AvgCardList avgDatas={data.user} avgTitles={userAvg} />
      </Section>
      <div className="w-ful md:flex flex-row gap-2">
        <Section titleHeader="동일 연령대 평균 데이터">
          <AvgCardList
            avgDatas={data.avg}
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
        let valueClass = "";
        if (target === "bmi") {
          const { text, status } = checkBmi(avgDatas[target]);
          value += ` | ${text}`;
          valueClass +=
            status === "less"
              ? "text-bmiLess"
              : status === "safe"
              ? "text-bmiSafe"
              : status === "warning"
              ? "text-bmiWraning"
              : status === "danger"
              ? "text-bmiDanger"
              : "text-black";
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
            valueClass={`font-semibold ${valueClass}`}
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
            isAmr
              ? "sm:absolute sm:right-2 sm:-top-5"
              : percent < 50
              ? " absolute -right-1 top-1/2 translate-x-full -translate-y-1/2 "
              : ""
          }
        >
          {calory.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
