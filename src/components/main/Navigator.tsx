import { LINK_ITEMS } from "@/constants/navConstants";
import { IconType } from "@react-icons/all-files";
import Link from "next/link";

interface NavigatorProps {
  pathname: string;
  navClass?: string;
  middleClass?: string;
  itemClass?: string;
  iconSize?: number | string;
}

export default function Navigator({
  pathname,
  navClass,
  middleClass,
  itemClass,
  iconSize,
}: NavigatorProps) {
  return (
    <nav className={navClass}>
      <div className={middleClass}>
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
