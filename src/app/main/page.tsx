import DataCard from "@/components/DataCard";
import { MAIN_LABELS } from "@/constants/mainConstants";
import { ReactNode } from "react";

export default async function Home() {
  const data = {
    user: {
      totalCalory: 1000,
      amr: 10000,
    },
    avg: {
      bmi: 0,
      bmr: 0,
      weight: 0,
    },
    date: "2024-04-28",
  };
  const mealPlanList = {
    [`08:00`]: 123455,
    [`12:00`]: 123455,
    [`14:00`]: 123455,
    [`18:30`]: 123455,
    [`20:00`]: 123455,
    [`21:00`]: 123455,
    [`22:00`]: 123455,
  };
  const { caloryData, avg } = MAIN_LABELS;

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
      <Section titleHeader="동일 연령대 평균 데이터">
        <div className="flex items-center gap-2 overflow-x-scroll p-1 scroll-hide">
          {Object.keys(avg).map((key) => {
            const target = key as keyof typeof avg;
            return (
              <DataCard
                key={target}
                className="basis-36 flex-grow flex-shrink-0 flex-col p-2 h-40 gap-3 justify-center items-center rounded-xl"
                labelClass="-translate-y-4"
                label={avg[target]}
                value={data.avg[target].toString()}
              />
            );
          })}
        </div>
      </Section>
      <div className="w-full min-h-full h-max sm:flex-1 sm:flex flex-row">
        <Section>asd</Section>
        <Section titleHeader="오늘 식단 목록" className="">
          <div className="flex h-full flex-col bg-cusbanana rounded-xl shadow-border ">
            <div className="flex rounded-t-xl overflow-hidden">
              <p className="max-w-32 w-full text-center border text-xl p-2">
                시간
              </p>
              <p className="w-full text-center border text-xl p-2">칼로리</p>
            </div>
            {Object.keys(mealPlanList).map((key, i, arr) => {
              const target = key as keyof typeof mealPlanList;
              const textClass = "w-full h-full text-center border p-2 ";
              return (
                <DataCard
                  key={target}
                  label={target}
                  value={mealPlanList[target].toLocaleString() + " kcal"}
                  className={
                    "flex-1 flex-row items-center shadow-none " +
                    (i === arr.length - 1
                      ? " rounded-b-xl overflow-hidden "
                      : "")
                  }
                  labelClass={`max-w-32 ${textClass}`}
                  valueClass={`font-semibold underline text-cusorange cursor-pointer ${textClass}`}
                />
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}

const Section = ({
  children,
  titleHeader,
  className,
}: {
  children: ReactNode;
  titleHeader?: string;
  className?: string;
}) => {
  return (
    <div className={"w-full " + (className ?? "")}>
      {titleHeader && <p>{titleHeader}</p>}
      {children}
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
