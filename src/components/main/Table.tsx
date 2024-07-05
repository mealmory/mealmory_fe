"use client";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";
interface TableProps {
  tHead: string;
  tclassName?: string;
  tDataList: { [key: string]: number };
  period: "day" | "week" | "month";
}

const Table = ({ tHead, tclassName, tDataList, period }: TableProps) => {
  const [page, setPage] = useState(1);
  const listDataSet = useMemo(() => {
    const periodNum = period === "week" ? 7 : period === "month" ? 10 : 5;
    const arr = Object.entries(tDataList);
    if (!arr.length) return { caloryList: undefined, pageLength: undefined };
    const caloryList = arr.slice(
      periodNum * page - periodNum,
      periodNum * page
    );
    while (caloryList.length < periodNum) {
      caloryList.push(["empty", 0]);
    }
    return {
      caloryList: caloryList,
      pageLength: Math.floor(arr.length / periodNum),
    };
  }, [tDataList, period, page]);

  const { caloryList, pageLength } = listDataSet;

  function handlePagenationClick(isNext: boolean) {
    if (pageLength && caloryList)
      setPage((prev) => {
        if (isNext) {
          if (prev < pageLength) return prev + 1;
        } else {
          if (prev > 1) return prev - 1;
        }
        return prev;
      });
  }

  const thClass = "border-2 p-1";
  return (
    <div
      className={
        "w-full h-full shadow-border rounded-xl bg-cusbanana overflow-hidden " +
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
            caloryList.map(([key, value], i) =>
              key === "empty" ? (
                <tr key={`${key}${i}${value}`}>
                  <td colSpan={2} className={thClass + " invisible"}>
                    {value}
                  </td>
                </tr>
              ) : (
                <tr key={`${key}${i}`}>
                  <td className={thClass}>{key}</td>
                  <td
                    className={`${thClass} font-semibold underline text-cusorange cursor-pointer`}
                  >
                    {value.toLocaleString() + " kcal"}
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
      <Pagination pageLength={pageLength} page={page} setPage={setPage} />
    </div>
  );
};

export default Table;
