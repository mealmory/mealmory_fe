"use client";

import useMealPlanStore from "@/store/mealPlanStore";
import useMenuRegion from "@/store/menuRegionStore";
import { errorAlert } from "@/utils/alertFns";
import { customFetch } from "@/utils/fetchClient";
import { checkSpecialCharacters } from "@/utils/inputFns";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { FormEvent, useEffect, useState } from "react";

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
  useEffect(() => {}, []);
  function handleSearchClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (checkSpecialCharacters(searchValue) || searchValue.length === 0) {
      const errorTitle =
        searchValue.length === 0
          ? "메뉴 이름을 입력해 주세요."
          : "올바르지 않은 입력입니다.";
      errorAlert(errorTitle, "", () => {
        setSearchValue("");
      });
    } else {
      customFetch
        .get<SearchResultDTO[]>("meal/food", {
          did: menuRegion.division,
          cid: menuRegion.category,
          name: searchValue,
        })
        .then((res) => {
          const ok = res.body.code === 0;
          setSearchResult(ok ? res.body.data : []);
        });
    }
  }
  return (
    <div className="w-[97%] h-[95%] pb-1 mx-auto rounded-xl shadow-border overflow-hidden">
      <form
        className="w-full border-b flex items-center p-3"
        onSubmit={handleSearchClick}
      >
        <input
          className="flex-1 dark:bg-cusdark outline-none "
          name="search"
          type="text"
          placeholder="검색할 메뉴 이름을 입력해주세요."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={20} />
        </button>
      </form>
      <div className="w-full h-[calc(100%-49px)] px-2 bg-gray-50 rounded-b-2xl overflow-y-hidden">
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
        <div className="w-full h-[calc(100%-49px)] pb-2 px-1 overflow-y-scroll overflow-x-hidden scroll-visible ">
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
      className="w-full p-2 py-3 flex items-center flex-nowrap justify-between gap-5 rounded-lg bg-white dark:bg-cusdark shadow-border mt-2 overflow-hidden"
      onClick={handleClick}
    >
      <p className="w-max text-left text-nowrap">{foodData.name}</p>
      <p className="flex-1 text-xs text-right overflow-hidden text-ellipsis text-nowrap">
        {foodData.make === "해당없음" ? "" : foodData.make}
      </p>
    </button>
  );
};
