"use client";

import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <div className="rounded-xl w-full pt-[13.3%] border" />,
});

interface SelectMenuProps {
  label: string;
  options: Array<{ value: number; label: string }>;
  disabled?: boolean;
  value: number;
  handleChange: (e: unknown) => void;
}

const SelectMenu = ({
  options,
  label,
  value,
  disabled,
  handleChange,
}: SelectMenuProps) => {
  return (
    <div>
      <p>{label}</p>
      <Select
        options={options}
        value={options.filter((option) => option.value === value)}
        isDisabled={disabled}
        onChange={handleChange}
        styles={{
          control: (styles) => ({
            ...styles,
            borderRadius: 13,
            padding: 5,
            "&:focus": {
              outline: "none",
              border: "none",
            },
          }),
          option: (styles, { isDisabled, isFocused, isSelected }) => {
            return {
              ...styles,
              backgroundColor: isDisabled
                ? undefined
                : isSelected
                ? "#FFFBD3"
                : isFocused
                ? "white"
                : isDisabled
                ? "#ccc"
                : undefined,
              color: isDisabled ? "#939393" : isSelected ? "#FFB800" : "black",
              cursor: isDisabled ? "not-allowed" : "default",
              boxShadow: "none",
              border: 0,
            };
          },
          input: (styles) => ({
            ...styles,
            outline: "none",
            border: "none",
          }),
        }}
      />
    </div>
  );
};

export default SelectMenu;
