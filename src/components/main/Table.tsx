"use client";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";
interface TableProps {
  tHead: string;
  tclassName?: string;
  tDataList: Array<{
    id: number;
    time: string;
    calory: number;
    empty: boolean;
  }>;
  period: "day" | "week" | "month";
}

const Table = ({ tHead, tclassName, tDataList, period }: TableProps) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const listDataSet = useMemo(() => {
    const periodNum = period === "week" ? 7 : period === "month" ? 10 : 5;
    if (!tDataList.length)
      return { caloryList: undefined, pageLength: undefined };
    const caloryList = tDataList.slice(
      periodNum * page - periodNum,
      periodNum * page
    );
    while (caloryList.length < periodNum) {
      caloryList.push({ id: 0, time: "", calory: 0, empty: true });
    }
    return {
      caloryList: caloryList,
      pageLength: Math.ceil(tDataList.length / periodNum),
    };
  }, [tDataList, period, page]);

  const { caloryList, pageLength } = listDataSet;

  const thClass = "border-2 p-1";
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
            <th className={thClass}>{tHead}</th>
            <th className={thClass}>칼로리</th>
          </tr>
        </thead>
        <tbody>
          {caloryList ? (
            caloryList.map(({ id, time, calory, empty }) =>
              empty ? (
                <tr key={`${id}${time}`}>
                  <td colSpan={2} className={thClass + " invisible"}>
                    {calory}
                  </td>
                </tr>
              ) : (
                <tr key={`${id}${time}`}>
                  <td className={thClass}>{time}</td>
                  <td
                    className={`${thClass} font-semibold underline text-cusorange cursor-pointer`}
                    onClick={() =>
                      router.push(
                        `/mealplan/${period === "day" ? "time" : "day"}/${id}`
                      )
                    }
                  >
                    {calory.toLocaleString() + " kcal"}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={2}>데이터가 없습니다.</td>
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
