"use client";

import Selector from "../Selector";

interface SelectMenuProps {
  label: string;
  options: Array<{ value: number; label: string }>;
  disabled?: boolean;
  value: number;
  handleClick: (optionValue: number) => void;
}

const SelectMenu = ({
  options,
  label,
  value,
  disabled,
  handleClick,
}: SelectMenuProps) => {
  return (
    <div>
      <p>{label}</p>
      <Selector
        className="p-[5px] rounded-xl focus:outline-none shadow-border"
        titleClass="py-1 px-2"
        disabled={disabled}
        options={options.map(({ value, label }) => ({
          name: label,
          optionValue: value,
        }))}
        value={value}
        handleClick={(value) => handleClick(value)}
      />
    </div>
  );
};

export default SelectMenu;
