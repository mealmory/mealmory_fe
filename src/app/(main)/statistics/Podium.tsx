import Image from "next/image";

const Podium = ({ rank }: { rank: { [key: string | number]: string } }) => {
  const rankResult = Object.entries(rank).map(([key, value]) => {
    const src =
        value === "fat"
          ? "/fatAvt.svg"
          : value === "normal"
          ? "/normalAvt.svg"
          : "/skinnyAvt.svg",
      alt = `${value} avatar`;
    return { src, alt, rank: key, type: value };
  });
  return (
    <div className="rounded-2xl bg-cusbanana shadow-border p-5 min-h-[23.12vw] h-max w-full basis-1/2 flex-1 flex items-end">
      <div className="border-b-2 border-black w-full flex items-end justify-around">
        {[rankResult[1], rankResult[0], rankResult[2]].map(
          ({ src, alt, rank, type }) => {
            return (
              <div key={alt} className="flex-1">
                <Image
                  src={src}
                  alt={alt}
                  className={
                    "mx-auto " +
                    (type === "fat"
                      ? "w-24"
                      : type === "normal"
                      ? " w-16"
                      : "w-14")
                  }
                  width={0}
                  height={0}
                />
                <div
                  className={
                    "w-full max-w-24 mx-auto " +
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
          }
        )}
      </div>
    </div>
  );
};

export default Podium;
