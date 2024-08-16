"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { redirectUri, scope } from "./kakaoConst";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get("act")) router.replace("/");
  }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <Image
        src="/mealmory_logo.svg"
        alt="밀모리 로고"
        width={0}
        height={0}
        className=" mb-5 w-[200px] h-[200px]"
        priority
      />
      <h1 className=" text-4xl">MealMory</h1>
      <h2 className=" text-xl">식사의 추억</h2>
      <button
        className="flex gap-2 rounded-xl bg-[#FEE500] text-[rgba(0,0,0,0.85)] p-3 items-center active:bg-[rgb(233,216,66)] mt-5"
        onClick={() => {
          if (typeof window !== undefined) {
            window.Kakao &&
              window.Kakao.Auth.authorize({
                redirectUri,
                scope,
              });
          }
        }}
      >
        <Image
          src={"/kakaoSymbol.svg"}
          width={0}
          height={0}
          className="w-5 h-5"
          alt="카카오 로고"
          color="#000000"
          priority
        />
        카카오톡 로그인
      </button>
    </div>
  );
}
