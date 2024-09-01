"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import { menuTypeTransform } from "@/app/(sub)/util";
interface TableProps {
  tHead: string;
  tclassName?: string;
  tDataList: Array<{
    id: number;
    time: string;
    total: number;
    type: number;
    empty: boolean;
  }>;
  period: "day" | "week" | "month";
}

const Table = ({ tHead, tclassName, tDataList, period }: TableProps) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const listDataSet = useMemo(() => {
    const periodNum = period === "month" ? 10 : 7;
    if (!tDataList.length)
      return { caloryList: undefined, pageLength: undefined };
    const caloryList = tDataList.slice(
      periodNum * page - periodNum,
      periodNum * page
    );
    let i = 0;
    while (caloryList.length < periodNum) {
      caloryList.push({ id: i++, time: "", total: 0, type: 0, empty: true });
    }
    return {
      caloryList: caloryList,
      pageLength: Math.ceil(tDataList.length / periodNum),
    };
  }, [tDataList, period, page]);

  const { caloryList, pageLength } = listDataSet;

  const thClass = "border-2 p-1";
  const colSpan = period === "day" ? 3 : 2;
  return (
    <div
      className={
        "w-full h-full shadow-border rounded-xl bg-cusbanana dark:bg-cusdarkbanana overflow-hidden " +
        (tclassName ?? "")
      }
    >
      <table className="w-full flex-1 h-full text-center border-collapse border-hidden">
        <thead className="border-b-4">
          <tr>
            {period === "day" && <th className={"w-1/12 " + thClass}>종류</th>}
            <th className={"w-3/12 " + thClass}>{tHead}</th>
            <th className={thClass}>칼로리</th>
          </tr>
        </thead>
        <tbody>
          {caloryList ? (
            caloryList.map(({ id, time, total, empty, type }) =>
              empty ? (
                <tr key={`${id}${time}`}>
                  <td colSpan={colSpan} className={thClass + " invisible"}>
                    {total}
                  </td>
                </tr>
              ) : (
                <tr key={`${id}${time}`}>
                  {period === "day" && (
                    <td className={thClass}>{menuTypeTransform(type)}</td>
                  )}
                  <td className={thClass} suppressHydrationWarning>
                    {tHead === "날짜"
                      ? time.split(" ")[0]
                      : time.split(" ")[1].substring(0, 5)}
                  </td>
                  <td
                    className={`${thClass} font-semibold underline text-cusorange cursor-pointer`}
                    onClick={() =>
                      router.push(
                        `/mealplan/${period === "day" ? `time` : "day"}/${
                          period === "day"
                            ? `${id}?time=${time.split(" ")[1].substring(0, 5)}`
                            : time.split(" ")[0]
                        }`
                      )
                    }
                  >
                    {total.toLocaleString() + " kcal"}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={colSpan}>데이터가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="w-full border-b" />
      <Pagination pageLength={pageLength} page={page} setPage={setPage} />
    </div>
  );
};

export default Table;
