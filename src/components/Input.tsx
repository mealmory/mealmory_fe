import { ChangeEvent, HTMLInputTypeAttribute, useId } from "react";

const Input = ({
  label,
  type,
  value,
  handleChange,
  disabled,
}: {
  label: string;
  type: HTMLInputTypeAttribute;
  value?: number | string;
  disabled?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const uuid = useId();
  return (
    <div className="w-full">
      <label htmlFor={uuid}>{label}</label>
      <br />
      <input
        type={type}
        min={type === "number" ? 0 : undefined}
        max={type === "number" ? 300 : undefined}
        id={uuid}
        value={type === "number" ? value?.toString() : value}
        onChange={handleChange}
        className=" outline-none shadow-border rounded-xl py-2 px-3 w-full text-xl disabled:text-gray-400"
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
