import { fetchClient } from "@/utils/fetchClient";
import MenuItem from "./MenuItem";
import DetailController from "./DetailController";

export interface MenuData {
  menu: string;
  calory: number;
  weight: number;
  unit: number;
  cpfGraph?: {
    carbs: number;
    protein: number;
    fat: number;
  };
}
interface MealPlanDetail {
  type: string;
  date: string;
  menuList: Array<MenuData>;
  total: number;
}

export default async function MealPlanDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const queryString = new URLSearchParams({
    id: id,
  }).toString();

  const { data } = await fetchClient<MealPlanDetail>(
    "dummy/meal/info" + "?" + queryString
  ).then((res) => res.body);

  return (
    <main className="w-full min-h-[calc(100vh-55px)] p-2 flex flex-col items-center justify-between gap-5">
      {/* 메뉴 이름 수정, 삭제 버튼 */}
      <div className="w-full h-full flex flex-col items-center gap-5">
        <div className="flex justify-between items-center w-full">
          <p className="text-xl sm:text-2xl pl-2">{data.type}</p>
          <DetailController
            className="hidden sm:flex items-center gap-2 w-1/4"
            id={id}
          />
        </div>
        {/* 메뉴 플립 리스트  */}
        <div className="rounded-xl shadow-border bg-cusbanana overflow-hidden w-full h-fulls">
          {data.menuList.map((item, i) => (
            <MenuItem
              key={item.menu + i}
              {...item}
              last={i === data.menuList.length - 1 ? true : undefined}
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
