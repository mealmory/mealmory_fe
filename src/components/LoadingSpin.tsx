import Image from "next/image";

export default function LoadingSpin() {
  return (
    <div className="w-full h-full min-h-rscreen flex justify-center items-center">
      <div className="max-w-full max-h-full w-[200px] h-[200px]">
        <Image
          src={"/LoadingCircle.svg"}
          width={0}
          height={0}
          className="w-full h-auto animate-spin"
          alt="로딩 이미지"
          priority
        />
      </div>
    </div>
  );
}
