"use client";
import Navigator from "@/app/(main)/_components/Navigator";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu } from "@react-icons/all-files/hi/HiMenu";
import { useEffect, useState } from "react";
import { fetchServer } from "@/utils/fetchClient";
import { errorAlert, questionAlert, successAlert } from "@/utils/alertFns";

export default function Header() {
  const pathname = usePathname();
  const [menuFlip, setMenuFlip] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMenuFlip(true);
  }, [pathname]);

  function handleLogoutClick() {
    questionAlert({
      title: "로그아웃 하시겠습니까?",
      text: "",
      confirmText: "로그아웃",
      afterEffect: () => {
        fetchServer("logout", {
          method: "POST",
          credentials: "same-origin",
        }).then((res) => {
          if (res.body.code === 0) {
            successAlert("안전하게 로그아웃 되었습니다.", "", () => {
              router.replace("/auth");
            });
          } else {
            errorAlert(
              "로그아웃에 실패하였습니다.",
              "잠시후 다시 시도해주세요."
            );
          }
        });
      },
    });
  }
  return (
    <header className="sm:h-rscreen h-max sm:w-40 w-full fixed top-0 left-0 bg-white dark:bg-cusdark z-10 flex flex-col sm:p-4 p-1 py-2 sm:shadow-border justify-center sm:justify-start gap-4">
      <div className="w-full self-center flex items-center gap-1 justify-between px-3 ">
        <div className="flex items-center gap-1 ">
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
        <button className="sm:hidden " onClick={() => setMenuFlip(false)}>
          <HiMenu size={30} />
        </button>
      </div>
      <Navigator
        pathname={pathname}
        navFlip={() => setMenuFlip(true)}
        navClass={
          "absolute flip-nav left-0 top-0 sm:relative sm:translate-x-0 sm:transition-none z-50 h-rscreen sm:bg-inherit sm:h-full w-full flex flex-col items-end sm:items-start " +
          (menuFlip ? "translate-x-full " : "bg-[rgba(0,0,0,0.35)]")
        }
        middleClass="flex flex-col justify-between bg-white dark:bg-cusdark w-3/4 h-full sm:w-full p-4 sm:p-0 self-end"
        itemClass="flex gap-1 items-center sm:text-base text-xl"
        navTransition={{
          transition: `transform 150ms ease-in-out ${
            !menuFlip ? "0s" : "200ms"
          }, background 200ms ease-in-out ${menuFlip ? "0s" : "200ms"}`,
        }}
        handleLogoutClick={handleLogoutClick}
      />
    </header>
  );
}
