"use client";

import { questionAlert, successAlert } from "@/utils/alertFns";
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
            afterEffect: async () => {
              const { code } = await customFetch
                .delete("meal/delete", { id })
                .then((res) => res.body);
              if (code === 0) {
                successAlert("성공적으로 삭제했습니다.", "", () => {
                  router.back();
                });
              } else {
                Swal.fire(
                  "식단 삭제에 실패했습니다.",
                  "잠시 후 다시 시도해 주세요."
                );
              }
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
      className=" border-2 fontExBold flex-1 p-2 text-gray-400"
      onClick={handler}
    >
      {name}
    </button>
  );
};

export default DetailController;
