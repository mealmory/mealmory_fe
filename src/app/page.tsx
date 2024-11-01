"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Root() {
  // const router = useRouter();

  // useEffect(() => {
  //   if (Cookies.get("act")) {
  //     router.replace("/home");
  //   } else {
  //     router.replace("/auth");
  //   }
  // }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <Image
        src="/mealmory_logo.svg"
        alt="밀모리 로고"
        width={200}
        height={100}
        className=" mb-4"
      />
      <h1 className=" text-4xl point-value">MealMory</h1>
      <h2 className=" text-xl">식사의 추억</h2>
      <p className="text-center mt-6">
        현재 서비스를 점검중 입니다.
        <br />
        이용에 불편을 드려 죄송합니다.
      </p>
    </div>
  );
}
