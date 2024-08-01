"use client";

import { questionAlert } from "@/utils/alertFns";
import { useRouter } from "next/navigation";

const DetailController = ({
  className,
  id,
}: {
  className: string;
  id: string;
}) => {
  const router = useRouter();

  return (
    <div className={className}>
      <Button
        name="수정"
        handler={() => {
          router.push(`/mealplan/edit/${id}`);
        }}
      />
      <Button
        name="삭제"
        handler={() => {
          questionAlert({
            afterEffect: () => {
              router.back();
            },
            title: "식단을 삭제하시겠습니까?",
            text: "삭제된 식단은 다시 복구할 수 없습니다.",
            confirmText: "삭제",
          });
        }}
      />
    </div>
  );
};

const Button = ({ name, handler }: { name: string; handler: () => void }) => {
  return (
    <button
      className=" border-2 font-bold flex-1 p-2 text-gray-400"
      onClick={handler}
    >
      {name}
    </button>
  );
};

export default DetailController;
