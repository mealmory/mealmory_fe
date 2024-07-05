"use client";
import { IconType } from "@react-icons/all-files";
import { BsFillBrightnessHighFill } from "@react-icons/all-files/bs/BsFillBrightnessHighFill";
import { BsMoon } from "@react-icons/all-files/bs/BsMoon";
import { BsCircleHalf } from "@react-icons/all-files/bs/BsCircleHalf";
import { useState } from "react";

const ThemeController = () => {
  const [curTheme, setCurTheme] = useState<"light" | "dark" | "system">(
    "light"
  );

  function handlThemeClick(type: typeof curTheme) {
    setCurTheme(type);
  }
  const icons = [
    {
      name: "밝은 테마",
      Icon: BsFillBrightnessHighFill,
      type: "light",
      color: "bg-cusorange",
    },
    {
      name: "어두운 테마",
      Icon: BsMoon,
      type: "dark",
      color: "bg-blue-500",
    },

    {
      name: "시스템 테마",
      Icon: BsCircleHalf,
      type: "system",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="w-full flex gap-2 items-center border-b-2 pb-2">
      {icons.map((item) => {
        const { type, ...props } = item;
        return (
          <ThemeBtn
            key={props.name}
            {...props}
            active={type === curTheme}
            handleClick={() => {
              handlThemeClick(type as typeof curTheme);
            }}
          />
        );
      })}
    </div>
  );
};

export default ThemeController;

const ThemeBtn = ({
  Icon,
  name,
  handleClick,
  active,
  color,
}: {
  Icon: IconType;
  name: string;
  handleClick: () => void;
  active: boolean;
  color: string;
}) => {
  const activeStyle = active ? `${color} text-white` : "bg-cusgray";
  return (
    <button
      className={"flex-1 sm:p-7 p-4 border " + activeStyle}
      type="button"
      onClick={handleClick}
    >
      <Icon size={40} style={{ margin: "0 auto", marginBottom: "15px" }} />
      <p className="mx-auto text-sm sm:text-base">{name}</p>
    </button>
  );
};
