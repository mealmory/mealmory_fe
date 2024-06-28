"use client";

import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
  loading: () => <div className="rounded-xl w-full h-[13vw] border" />,
});

interface SelectMenuProps {
  label: string;
  name: string;
  options: Array<{ value: number; label: string }>;
  disabled?: boolean;
  setSelectedOption: Dispatch<
    SetStateAction<{
      birth: number;
      actLevel: number;
    }>
  >;
}

const SelectMenu = ({
  options,
  setSelectedOption,
  label,
  name,
  disabled,
}: SelectMenuProps) => {
  return (
    <div>
      <p>{label}</p>
      <Select
        options={options}
        defaultValue={options[0]}
        isDisabled={disabled}
        onChange={(e) => {
          const event = e as { value: number; label: string };
          setSelectedOption((prev) => ({ ...prev, [name]: event.value }));
        }}
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
