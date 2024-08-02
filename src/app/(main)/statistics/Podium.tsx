import Image from "next/image";

const Podium = ({
  rank,
  period,
}: {
  rank: { [key: string | number]: string } | undefined;
  period: 1 | 7 | 30;
}) => {
  const rankResult = rank
    ? Object.entries(rank).map(([key, value]) => {
        const src =
            value === "fat"
              ? "/fatAvt.svg"
              : value === "normal"
              ? "/normalAvt.svg"
              : "/skinnyAvt.svg",
          alt = `${value} avatar`;
        return {
          src,
          alt,
          rank: key,
          type: value as "fat" | "normal" | "skinny",
        };
      })
    : undefined;
  return (
    <div className="rounded-2xl bg-cusbanana dark:bg-cusdarkbanana shadow-border p-5 min-h-[23.12vw] h-max w-full basis-1/2 flex-1 flex items-end">
      {rankResult ? (
        period === 1 ? (
          <DayTopCharacter topCharacter={rankResult[0]} />
        ) : (
          <WeekMonthCharacter
            rankingList={[rankResult[1], rankResult[0], rankResult[2]]}
          />
        )
      ) : null}
    </div>
  );
};

export default Podium;

const CHARATER_MENTION = {
  fat: "혹시.. 벌크업 중이신가요?",
  normal: "오늘도 완벽한 칼로리 컨트롤!",
  skinny: "혹시 굶고 계시진 않으시죠..?",
};

const DayTopCharacter = ({
  topCharacter,
}: {
  topCharacter: {
    src: string;
    alt: string;
    rank: string;
    type: "fat" | "normal" | "skinny";
  };
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center gap-5">
      <Image
        src={topCharacter.src}
        alt={topCharacter.alt}
        width={0}
        height={0}
        className="w-[100px] sm:w-[120px]"
      />
      <p className="text-center">{CHARATER_MENTION[topCharacter.type]}</p>
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
