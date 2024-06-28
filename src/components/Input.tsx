import { HTMLInputTypeAttribute, useId } from "react";

const Input = ({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
}) => {
  const uuid = useId();
  return (
    <div className="w-full">
      <label htmlFor={uuid}>{label}</label>
      <br />
      <input
        type={type}
        min={type === "number" ? 0 : type === "date" ? "1924-01-01" : undefined}
        id={uuid}
        name={name}
        className=" outline-none shadow-border rounded-xl py-2 px-3 w-full text-xl"
      />
    </div>
  );
};

export default Input;
