import { CATEGORY_NAME } from "@/constants/mainConstants";
import Modal from "./Modal";

export default function CategoryModal() {
  return (
    <Modal>
      <div className="flex flex-col md:flex-row justify-center h-max gap-4 p-3 overflow-y-scroll">
        <CategoryList divisiton="inout" />
        <CategoryList divisiton="processed" />
      </div>
    </Modal>
  );
}

const CategoryList = ({ divisiton }: { divisiton: "inout" | "processed" }) => {
  const Htext = divisiton === "inout" ? "가정식 및 외식" : "가공 식품";
  return (
    <div className="flex-1">
      <p className="text-center mb-5 text-xl">{Htext}</p>
      <div className="grid grid-cols-80 gap-2">
        {CATEGORY_NAME[divisiton].map((name, i) => (
          <button
            key={`${divisiton}${name}${i}`}
            className="rounded-lg shadow-border p-2 h-20"
          >
            <p className="break-words">{name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
