"use client";

import { LINK_ITEMS } from "@/constants/navConstants";
import { IconType } from "@react-icons/all-files";
import Image from "next/image";
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
        <header className="sm:h-screen h-max sm:w-40 w-full fixed top-0 left-0 bg-white dark:bg-cusdark z-10">
          <nav className="flex sm:flex-col items-center gap-5 justify-center sm:justify-start sm:p-4 sm:shadow-border h-full">
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
            <div className="hidden sm:flex flex-col gap-4">
              {LINK_ITEMS.map(({ title, link, icon }) => (
                <NavItem
                  key={title}
                  title={title}
                  link={link}
                  active={pathname === link}
                  icon={icon}
                />
              ))}
            </div>
          </nav>
        </header>
      ) : null}
    </>
  );
}

const NavItem = ({
  title,
  link,
  active,
  icon,
}: {
  title: string;
  link: string;
  active: boolean;
  icon: {
    normal: IconType;
    matched: IconType;
  };
}) => {
  const { matched: ActiveIcon, normal: NormalIcon } = icon;
  return (
    <Link
      className={"flex gap-1 items-center " + (active ? "font-bold" : "")}
      href={link}
    >
      {active ? <ActiveIcon /> : <NormalIcon />}
      {title}
    </Link>
  );
};
