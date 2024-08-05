"use client";

import { customFetch, fetchClient } from "@/utils/fetchClient";
import MenuItem from "./MenuItem";
import DetailController from "./DetailController";
import { useEffect, useState } from "react";
import { menuTypeTransform } from "@/utils/mealplanFns";
import { errorAlert } from "@/utils/alertFns";
import { useRouter } from "next/navigation";

export interface MealDetailDTO {
  did: number;
  cid: number;
  fid: number;
  menu: string;
  kcal: number;
  amount: number;
  unit: string;
  menu_spec: {
    carbs: number;
    protein: number;
    fat: number;
  };
}
interface MealPlanDetailResponse {
  type: number;
  date: string;
  list: Array<MealDetailDTO>;
  total: number;
}

export default function MealPlanDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [data, setData] = useState<MealPlanDetailResponse>();

  useEffect(() => {
    customFetch
      .get<MealPlanDetailResponse[]>("meal/info", { id: id })
      .then((res) => {
        if (res.body.code === 0) {
          setData(res.body.data[0]);
        } else {
          const code = res.body.code;
          errorAlert(
            String(code)[0] === "2" || String(code)[0] === "3"
              ? "잘못된 접근입니다."
              : "데이터를 가져올 수 없습니다.",
            "",
            () => {
              (String(code)[0] === "2" || String(code)[0] === "3") &&
                router.back();
            }
          );
        }
      });
  }, [id]);
  const mealType = data ? menuTypeTransform(data.type) : "";

  return (
    <main className="w-full min-h-[calc(100vh-55px)] p-2 flex flex-col items-center justify-between gap-5">
      {/* 메뉴 이름 수정, 삭제 버튼 */}
      <div className="w-full h-full flex flex-col items-center gap-5">
        <div className="flex justify-between items-center w-full">
          <p className="text-xl sm:text-2xl pl-2">{mealType}</p>
          <DetailController
            className="hidden sm:flex items-center gap-2 w-1/4"
            id={id}
          />
        </div>
        {/* 메뉴 플립 리스트  */}
        <div className="rounded-xl shadow-border bg-cusbanana dark:bg-cusdarkbanana overflow-hidden w-full h-fulls">
          {data?.list &&
            data.list.length > 0 &&
            data.list.map((item, i) => (
              <MenuItem
                key={item.menu + i}
                {...item}
                last={i === data.list.length - 1 ? true : undefined}
                first={i === 0 ? true : undefined}
              />
            ))}
        </div>
      </div>
      <DetailController
        className="w-full sm:hidden flex items-center gap-2"
        id={id}
      />
    </main>
  );
}
