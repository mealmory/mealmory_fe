import { useId } from "react";
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
interface CheckBoxProps {
  name: string;
  handleClick: () => void;
  checked: boolean;
}
const CheckBox = ({ name, handleClick, checked }: CheckBoxProps) => {
  const uuid = useId();
  return (
    <label
      htmlFor={"checkbox-" + uuid}
      className="flex items-center gap-1 w-max text-lg"
    >
      <input
        id={"checkbox-" + uuid}
        type="checkbox"
        onChange={handleClick}
        className=" hidden"
        checked={checked}
      />
      <div
        className={`border border-gray-700 dark:border-gray-300 rounded-md w-5 h-5 flex items-center justify-center ${
          checked ? "bg-[#FFFBD3] text-[#FFB800]" : ""
        }`}
      >
        {checked && <BsCheck size={18} />}
      </div>
      <span className="point-value">{name}</span>
    </label>
  );
};

export default CheckBox;
