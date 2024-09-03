import Image from "next/image";
import useDate from "@/store/selectDateStore";
import { CharName } from "./StatisticsType";

const Podium = ({
  rank,
}: {
  rank: { [key: string | number]: string } | undefined;
}) => {
  const { period } = useDate();
  function transCharictorKey(charName: CharName): "fat" | "normal" | "skinny" {
    if (charName === "과식") return "fat";
    if (charName === "보통") return "normal";
    return "skinny";
  }
  const rankResult = rank
    ? Object.entries(rank).map(([key, value]) => {
        const charKey = transCharictorKey(value as CharName);
        const src =
            charKey === "fat"
              ? "/fatAvt.svg"
              : charKey === "normal"
              ? "/normalAvt.svg"
              : "/skinnyAvt.svg",
          alt = `${charKey} avatar`;
        return {
          src,
          alt,
          rank: key,
          type: charKey,
        };
      })
    : undefined;
  return (
    <div className="rounded-2xl bg-cusbanana dark:bg-cusdarkbanana shadow-border p-5 min-h-[23.12vw] h-max w-full basis-1/2 flex-1 flex items-end animate-float">
      {rankResult ? (
        period === "day" ? (
          <DayTopCharacter topCharacter={rankResult[0]} />
        ) : (
          <WeekMonthCharacter
            rankingList={[rankResult[1], rankResult[0], rankResult[2]]}
          />
        )
      ) : (
        <DayTopCharacter />
      )}
    </div>
  );
};

export default Podium;

const CHARATER_MENTION = {
  fat: "혹시.. 벌크업 중이신가요?",
  normal: "오늘도 완벽한 칼로리 컨트롤!",
  skinny: "혹시 굶고 계시진 않으시죠..?",
  empty: "기록된 식단이 없습니다. 새로운 식단을 추가해보세요!",
};

const DayTopCharacter = ({
  topCharacter,
}: {
  topCharacter?: {
    src: string;
    alt: string;
    rank: string;
    type: "fat" | "normal" | "skinny";
  };
}) => {
  return (
    <div className="flex flex-col items-center self-center justify-center flex-1 gap-5">
      {topCharacter && (
        <Image
          src={topCharacter.src}
          alt={topCharacter.alt}
          width={0}
          height={0}
          className="w-[100px] sm:w-[120px]"
        />
      )}
      <p className="text-center">
        {CHARATER_MENTION[topCharacter ? topCharacter.type : "empty"]}
      </p>
    </div>
  );
};

const WeekMonthCharacter = ({
  rankingList,
}: {
  rankingList: Array<{
    src: string;
    alt: string;
    rank: string;
    type: "fat" | "normal" | "skinny";
  }>;
}) => {
  return (
    <div
      className={
        "border-b-2 border-black w-full flex items-end justify-around "
      }
    >
      {rankingList.map(({ src, alt, rank, type }) => {
        return (
          <div key={alt} className="flex-1">
            <Image
              src={src}
              alt={alt}
              className={
                "mx-auto " +
                (type === "fat"
                  ? "w-16 sm:w-24"
                  : type === "normal"
                  ? "w-10 sm:w-16"
                  : "w-10 sm:w-14")
              }
              width={0}
              height={0}
            />
            <div
              className={
                "w-full max-w-16 sm:max-w-24 mx-auto " +
                (+rank === 1
                  ? "h-28 bg-[#F9D308]"
                  : +rank === 2
                  ? " h-16 bg-[#ECECEC]"
                  : "h-9 bg-[#CC9326]")
              }
            >
              <p className="text-center text-black">{rank}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
