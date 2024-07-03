"use client";
import Navigator from "@/components/main/Navigator";
import usePath from "@/hooks/usePath";
import Image from "next/image";

export default function Header() {
  const { pathname, isShow } = usePath();
  return isShow ? (
    <header className="sm:h-screen h-max sm:w-40 w-full fixed top-0 left-0 bg-white dark:bg-cusdark z-10 flex flex-col sm:p-4 p-1 sm:shadow-border justify-center sm:justify-start gap-4">
      <div className=" self-center flex items-center gap-1">
        <Image
          src={"/mealmory_logo.svg"}
          alt="밀모리 로고"
          width={0}
          height={0}
          className="w-full h-auto"
          priority
        />
        <p>MealMory</p>
      </div>
      <Navigator
        pathname={pathname}
        navClass="hidden sm:block h-full w-full"
        middleClass="flex flex-col gap-4 mx-auto w-max"
        itemClass="flex gap-1 items-center"
      />
    </header>
  ) : null;
}
