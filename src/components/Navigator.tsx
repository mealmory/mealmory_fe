"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigator() {
  const pathname = usePathname();
  const showFlag =
    pathname === "/home" ||
    pathname === "/graph" ||
    pathname === "/profile" ||
    pathname === "/more";
  return (
    <>
      {showFlag ? (
        <header className="sm:h-screen h-max w-full sm:w-max sm:relative">
          <nav className="flex sm:flex-col items-center gap-2 justify-center sm:justify-start sm:p-4 sm:shadow-border h-full">
            <div className=" self-center">MealMory</div>
            <div className="hidden sm:flex flex-col gap-2">
              {[
                { title: "메인", link: "/home" },
                { title: "통계", link: "/graph" },
                { title: "프로필", link: "/profile" },
                { title: "더보기", link: "/more" },
              ].map(({ title, link }) => (
                <NavItem key={title} title={title} link={link} />
              ))}
            </div>
          </nav>
        </header>
      ) : null}
    </>
  );
}

const NavItem = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link className="flex gap-1 active:font-bold" href={link}>
      {title}
    </Link>
  );
};
