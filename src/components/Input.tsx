import { ChangeEvent, HTMLInputTypeAttribute, useId } from "react";

const Input = ({
  label,
  type,
  value,
  handleChange,
}: {
  label: string;
  type: HTMLInputTypeAttribute;
  value?: number | string;
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
        id={uuid}
        value={value}
        onChange={handleChange}
        className=" outline-none shadow-border rounded-xl py-2 px-3 w-full text-xl"
      />
    </div>
  );
};

export default Input;
