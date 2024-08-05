"use client";

import useMealPlanStore from "@/store/mealPlanStore";
import useMenuRegion from "@/store/menuRegionStore";
import { fetcher } from "@/utils/fetchClient";
import { getTimestamp } from "@/utils/timestamp";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { useEffect, useState } from "react";

interface SearchResultDTO {
  amount: number;
  carbs: number;
  cid: number;
  cre_date: string;
  did: number;
  fat: number;
  id: number;
  kcal: number;
  make: string;
  mod_date: any;
  name: string;
  protein: number;
  ref_date: string;
  reg_date: string;
  source: string;
  unit: "g" | "ml";
  value: number;
}
interface TempResult {
  menu: string;
  kcal: number;
  amount: number;
  unit: number;
  did: number;
  cid: number;
  fid: number;
  menu_spec: {
    carbs: number;
    protein: number;
    fat: number;
  };
}
const MenuSearchField = ({
  handleClose,
  handleSelfClick,
}: {
  handleClose: () => void;
  handleSelfClick: () => void;
}) => {
  const { menuRegion } = useMenuRegion();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResultDTO[]>();
  useEffect(() => {
    fetcher<{
      in: SearchResultDTO[];
      out: SearchResultDTO[];
      processed: SearchResultDTO[];
    }>(
      "main/data?" +
        new URLSearchParams({ timestamp: getTimestamp().toString() }),
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.body.code === 0) {
        const tempKey =
          menuRegion.division === 1
            ? "processed"
            : menuRegion.division === 2
            ? "in"
            : "out";
        setSearchResult(res.body.data[tempKey]);
      }
    });
  }, []);
  return (
    <div className="w-[97%] h-[95%] mx-auto rounded-xl shadow-border overflow-x-hidden overflow-y-scroll pb-3">
      <div className="w-full border-b flex items-center p-3">
        <input
          className="flex-1 dark:bg-cusdark"
          type="text"
          placeholder="검색할 메뉴 이름을 입력해주세요."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <BsSearch size={20} />
      </div>
      <div className="w-full px-3 pb-2 bg-gray-50 rounded-b-2xl">
        <button
          className="w-full border-b border-black p-2 py-3 flex items-center justify-between rounded-none"
          onClick={handleSelfClick}
        >
          <p>직접 입력</p>
          <small className="text-xs">
            *검색 결과가 없는 경우 선택해주세요*
          </small>
        </button>
        {/* 검색 결과 */}
        {searchResult &&
          searchResult.map((item) => (
            <ResultItem
              key={item.id}
              foodData={item}
              handleClose={handleClose}
            />
          ))}
      </div>
    </div>
  );
};

export default MenuSearchField;

const ResultItem = ({
  foodData,
  handleClose,
}: {
  foodData: SearchResultDTO;
  handleClose: () => void;
}) => {
  const { addMeal, cmid, setMeal, setCmid } = useMealPlanStore();
  function handleClick() {
    const {
      did,
      cid,
      id: fid,
      name: menu,
      kcal,
      amount,
      unit,
      fat,
      protein,
      carbs,
      value,
    } = foodData;
    if (cmid === "") {
      addMeal({
        type: "search",
        did,
        cid,
        fid,
        menu,
        amount,
        unit: unit === "g" ? 1 : 0,
        kcal,
        value,
        menu_spec: {
          fat: fat,
          protein: protein,
          carbs: carbs,
        },
      });
    } else {
      setMeal({
        id: cmid,
        type: "search",
        did,
        cid,
        fid,
        menu,
        amount,
        unit: unit === "g" ? 1 : 0,
        kcal,
        value,
        menu_spec: {
          fat: fat,
          protein: protein,
          carbs: carbs,
        },
      });
    }
    setCmid("");
    handleClose();
  }
  return (
    <button
      className="w-full p-2 py-3 flex items-center justify-between rounded-lg bg-white dark:bg-cusdark shadow-border mt-2"
      onClick={handleClick}
    >
      <p>{foodData.name}</p>
      <p className="text-xs">
        {foodData.make === "해당없음" ? "" : foodData.make}
      </p>
    </button>
  );
};
