import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <Image
        src="/mealmory_logo.svg"
        alt="밀모리 로고"
        width={200}
        height={100}
        className=" mb-5"
      />
      <h1 className=" text-4xl">MealMory</h1>
      <h2 className=" text-xl">식사의 추억</h2>
      <Link
        href={"/auth/consent"}
        className="flex gap-2 rounded-xl bg-[#FEE500] text-[rgba(0,0,0,0.85)] p-3 items-center active:bg-[rgb(233,216,66)] mt-5"
      >
        <Image
          src={"/kakaoSymbol.svg"}
          width={20}
          height={20}
          alt="카카오 로고"
          color="#000000"
        />
        카카오톡 로그인
        {/* 임시 레이아웃 용 */}
      </Link>
      {/* <button className="flex gap-2 rounded-xl bg-[#FEE500] text-[rgba(0,0,0,0.85)] p-3 items-center active:bg-[rgb(233,216,66)] mt-5">
        <Image
          src={"/kakaoSymbol.svg"}
          width={20}
          height={20}
          alt="카카오 로고"
          color="#000000"
        />
        카카오톡 로그인
      </button> */}
    </div>
  );
}
