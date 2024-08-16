import { LINK_ITEMS } from "@/constants/navConstants";
import { IconType } from "@react-icons/all-files";
import { HiLogout } from "@react-icons/all-files/hi/HiLogout";
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
}

export default function Navigator({
  pathname,
  navClass,
  middleClass,
  itemClass,
  iconSize,
  navFlip,
  navTransition,
}: NavigatorProps) {
  return (
    <nav className={navClass} style={navTransition}>
      <div className={middleClass}>
        <button className="self-end sm:hidden" onClick={navFlip}>
          <HiLogout size={30} />
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
