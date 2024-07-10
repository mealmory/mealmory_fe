import Link from "next/link";
import FlipItem from "../../FlipItem";

export default function MealPlanOfDay({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = Array.from({ length: 5 }, (_, i) => ({
    type:
      i === 0
        ? "아침"
        : i === 1
        ? "점심"
        : i === 2
        ? "간식"
        : i === 3
        ? "저녁"
        : "야식",
    date: "2024-04-31 11:00:00",
    total: 1231315,
    id: i + 1,
    cpfData: {
      carbs: 214,
      protein: 0,
      fat: 0,
    },
    menuList: [
      {
        menu: "밥",
        calory: 3124,
        weight: 200,
        unit: 1,
      },
      {
        menu: "김치",
        calory: 1234,
        weight: 30,
        unit: 1,
      },
      {
        menu: "스팸",
        calory: 13241,
        weight: 50,
        unit: 1,
      },
    ],
  }));
  function translationCdfTitle(key: "carbs" | "protein" | "fat") {
    switch (key) {
      case "carbs":
        return "탄수화물";
      case "protein":
        return "단백질";
      case "fat":
        return "지방";
    }
  }
  return (
    <main className="min-h-[calc(100vh-55px)] h-full w-full p-2">
      <div className="rounded-xl shadow-border w-full bg-cusbanana">
        {data.map(
          ({ type, date, total, id: detailId, menuList, cpfData }, i) => (
            <FlipItem
              title={type}
              key={detailId}
              first={i === 0 ? true : undefined}
              last={i === data.length - 1 ? true : undefined}
            >
              <div className="flex flex-col gap-3 p-5">
                <p>
                  식사 시간 :{" "}
                  <Link
                    href={`/mealplan/time/${id}`}
                    className="font-semibold text-cusorange underline cursor-pointer"
                  >
                    {date.substring(11, 16)}
                  </Link>
                </p>
                <p>칼로리 : {total.toLocaleString()} kcal</p>
                {cpfData && (
                  <div className="rounded-xl shadow-border overflow-hidden">
                    <table className="text-center border-collapse border-hidden w-full">
                      <tbody>
                        {Object.entries(cpfData).map(([key, value]) => (
                          <tr key={key}>
                            <th className="border w-[40%] p-2 font-normal">
                              {translationCdfTitle(key as keyof typeof cpfData)}
                            </th>
                            <td className="border w-[60%] p-2 font-medium">
                              {value} g
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="md:flex gap-2 flex-wrap w-full h-full p-5 bg-zinc-300">
                {menuList.map(({ menu, calory, weight, unit }, i) => (
                  <div
                    key={menu + i}
                    className=" rounded-xl shadow-border p-3 md:basis-[376px] flex-1 md:flex-grow-0 md:flex-shrink-0  bg-white mb-2 md:mb-0"
                  >
                    <p className="text-center mb-1 text-lg">{menu}</p>
                    <p>칼로리 : {calory.toLocaleString()} kcal</p>
                    <p>
                      섭취량 : {weight.toLocaleString()}{" "}
                      {unit === 0 ? "ml" : "g"}
                    </p>
                  </div>
                ))}
              </div>
            </FlipItem>
          )
        )}
      </div>
    </main>
  );
}
