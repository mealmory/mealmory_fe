"use client";
import { ReactNode, useMemo, useState } from "react";
import { BsChevronLeft } from "@react-icons/all-files/bs/BsChevronLeft";
import { BsChevronRight } from "@react-icons/all-files/bs/BsChevronRight";
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
      {pageLength && pageLength > 1 ? (
        <div className="w-full flex items-center justify-center gap-2 border-t p-2">
          <Button
            disabled={page <= 1}
            dot={<BsChevronLeft className="text-black" />}
            handleButtonClick={() => handlePagenationClick(false)}
          />
          <ul className="flex gap-2">
            {Array.from({ length: pageLength }, (_, i) => i + 1).map((num) => (
              <li key={num}>
                <Button
                  className={
                    "rounded-lg w-6 sm:block " +
                    (num === page
                      ? "text-white bg-cusorange font-bold block"
                      : "hidden")
                  }
                  dot={num}
                  handleButtonClick={() => setPage(num)}
                />
              </li>
            ))}
          </ul>
          <Button
            disabled={page === pageLength}
            dot={<BsChevronRight className="text-black" />}
            handleButtonClick={() => handlePagenationClick(true)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Table;

const Button = ({
  disabled,
  dot,
  handleButtonClick,
  className,
}: {
  disabled?: boolean;
  handleButtonClick: () => void;
  dot: number | ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={"cursor-pointer disabled:invisible " + (className ?? "")}
      disabled={disabled}
      onClick={handleButtonClick}
    >
      {dot}
    </button>
  );
};
