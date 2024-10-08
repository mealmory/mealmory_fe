import { type } from "os";
import { ChangeEvent, useId } from "react";

const TextArea = ({
  label,
  value,
  handleChange,
  disabled,
  className,
  suppressHydrationWarning,
}: {
  label: string;
  value?: number | string;
  disabled?: boolean;
  className: string;
  suppressHydrationWarning?: boolean;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  const uuid = useId();
  return (
    <div className={"w-full " + (className ?? "")}>
      <label htmlFor={uuid}>{label}</label>
      <br />
      <textarea
        id={uuid}
        value={value}
        onChange={handleChange}
        className={
          "outline-none shadow-border h-[calc(100%-26px)] rounded-xl py-2 px-3 w-full text-xl disabled:text-gray-400 resize-none overflow-y-scroll"
        }
        disabled={disabled}
        suppressHydrationWarning={suppressHydrationWarning}
      />
    </div>
  );
};

export default TextArea;
