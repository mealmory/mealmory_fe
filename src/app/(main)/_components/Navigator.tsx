import { LINK_ITEMS } from "@/constants/navConstants";
import { IconType } from "@react-icons/all-files";
import { HiX } from "@react-icons/all-files/hi/HiX";
import Link from "next/link";
import { CSSProperties } from "react";

interface NavigatorProps {
  pathname: string;
  navClass?: string;
  middleClass?: string;
  itemClass?: string;
  iconSize?: number | string;
  navFlip: () => void;
  navTransition: CSSProperties;
  handleLogoutClick: () => void;
}

export default function Navigator({
  pathname,
  navClass,
  middleClass,
  itemClass,
  iconSize,
  navFlip,
  navTransition,
  handleLogoutClick,
}: NavigatorProps) {
  return (
    <nav className={navClass} style={navTransition}>
      <div className={middleClass}>
        <div className="flex flex-col  gap-6 sm:gap-4">
          <button className="self-end sm:hidden" onClick={navFlip}>
            <HiX size={30} />
          </button>
          {LINK_ITEMS.map(({ title, link, icon }) => (
            <NavItem
              key={title}
              title={title}
              link={link}
              active={pathname === link}
              className={itemClass}
              icon={icon}
              iconSize={iconSize}
            />
          ))}
        </div>
        <button
          className="w-full p-2 text-gray-400"
          onClick={handleLogoutClick}
        >
          로그아웃
        </button>
      </div>
    </nav>
  );
}

export const NavItem = ({
  title,
  link,
  active,
  icon,
  className,
  iconSize,
}: {
  title: string;
  link: string;
  active: boolean;
  className?: string;
  iconSize?: number | string;
  icon: {
    normal: IconType;
    matched: IconType;
  };
}) => {
  const { matched: ActiveIcon, normal: NormalIcon } = icon;
  return (
    <Link
      className={(className ?? "") + "" + (active ? " font-bold" : "")}
      href={link}
    >
      {active ? <ActiveIcon size={iconSize} /> : <NormalIcon size={iconSize} />}
      <p>{title}</p>
    </Link>
  );
};
