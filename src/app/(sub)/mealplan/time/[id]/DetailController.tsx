"use client";

import { questionAlert } from "@/utils/alertFns";
import { customFetch } from "@/utils/fetchClient";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const DetailController = ({
  className,
  id,
}: {
  className: string;
  id: string;
}) => {
  const router = useRouter();

  function handleDeleteClick() {
    customFetch.delete("meal/delete", { id }).then((res) => {
      if (res.body.code === 0) {
        return res.body.message;
      } else {
        throw new Error();
      }
    });
  }

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
            afterEffect: handleDeleteClick,
            title: "식단을 삭제하시겠습니까?",
            text: "삭제된 식단은 다시 복구할 수 없습니다.",
            confirmText: "삭제",
          })
            .then((res) => {
              Swal.showValidationMessage("성공적으로 삭제했습니다.");
              router.back();
            })
            .catch((e) => {
              Swal.fire(
                "식단 삭제에 실패했습니다.",
                "잠시 후 다시 시도해 주세요."
              );
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
