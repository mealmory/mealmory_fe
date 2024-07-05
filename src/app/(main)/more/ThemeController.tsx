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
      color: "peer-checked:bg-cusorange",
    },
    {
      name: "어두운 테마",
      Icon: BsMoon,
      type: "dark",
      color: "peer-checked:bg-blue-500",
    },

    {
      name: "시스템 테마",
      Icon: BsCircleHalf,
      type: "system",
      color: "peer-checked:bg-green-500",
    },
  ];

  return (
    <fieldset className="w-full flex gap-2 items-center border-b-2 pb-5">
      {icons.map((item) => {
        const { type, ...props } = item;
        return (
          <ThemeBtn
            key={props.name}
            {...props}
            checked={type === curTheme}
            handleClick={() => {
              handlThemeClick(type as typeof curTheme);
            }}
          />
        );
      })}
    </fieldset>
  );
};

export default ThemeController;

const ThemeBtn = ({
  Icon,
  name,
  handleClick,
  checked,
  color,
}: {
  Icon: IconType;
  name: string;
  handleClick: () => void;
  checked: boolean;
  color: string;
}) => {
  return (
    <label className={"flex-1"}>
      <input
        className="hidden peer"
        type="radio"
        checked={checked}
        onChange={handleClick}
      />
      <div
        className={
          "w-full sm:p-7 transition ease-in-out duration-300 p-4 rounded-xl bg-cusgray peer-checked:text-white " +
          color
        }
      >
        <Icon size={40} style={{ margin: "0 auto", marginBottom: "15px" }} />
        <p className="text-center text-sm sm:text-base ">{name}</p>
      </div>
    </label>
  );
};
