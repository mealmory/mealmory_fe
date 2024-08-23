"use client";

import useMealPlanStore from "@/store/mealPlanStore";
import useMenuRegion from "@/store/menuRegionStore";
import { errorAlert, questionAlert } from "@/utils/alertFns";
import { customFetch } from "@/utils/fetchClient";
import { checkSpecialCharacters } from "@/utils/inputFns";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { useRouter } from "next/navigation";
import { FormEvent, SetStateAction, useEffect, useRef, useState } from "react";

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

interface SearchResponse {
  count: number;
  list: SearchResultDTO[];
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
  const [searchResult, setSearchResult] = useState<SearchResponse>({
    count: 0,
    list: [],
  });
  const [page, setPage] = useState(1);
  const router = useRouter();

  function searchResultUpdate(isPutData: boolean) {
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
        .get<SearchResponse>("meal/food", {
          did: menuRegion.division,
          cid: menuRegion.category,
          name: searchValue,
          page,
        })
        .then((res) => {
          const { code } = res.body;
          if (code === 0)
            setSearchResult((prev) => ({
              count: res.body.data.count,
              list: isPutData
                ? res.body.data.list
                : [...prev.list, ...res.body.data.list],
            }));
          else if (code === 2002) {
            questionAlert({
              title: "검색한 음식을 찾을 수 없습니다.",
              text: "메뉴를 직접 입력하거나 다른 메뉴를 검색하시겠습니까?",
              confirmText: "직접 입력",
              cancelText: "다른 메뉴 검색",
              afterEffect: () => {
                handleSelfClick();
              },
            });
          } else {
            errorAlert(
              "오류가 발생했습니다.",
              "잠시 후 다시 시도해 주세요",
              () => {
                router.back();
              }
            );
          }
        });
    }
  }

  function handleSearchClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchResultUpdate(true);
  }

  useEffect(() => {
    if (searchResult.list.length > 0 && page > 1) {
      searchResultUpdate(false);
    }
  }, [page]);

  useEffect(() => {
    return () => {
      setPage(1);
      setSearchValue("");
      setSearchResult({ count: 0, list: [] });
    };
  }, []);

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
        <SearchedList
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          setPage={setPage}
          page={page}
          handleClose={handleClose}
          isInfinity={searchResult.list.length > 0}
        />
      </div>
    </div>
  );
};

export default MenuSearchField;

const SearchedList = ({
  searchResult,
  setPage,
  page,
  handleClose,
  isInfinity,
}: {
  isInfinity: boolean;
  page: number;
  searchResult: SearchResponse;
  setPage: (value: SetStateAction<number>) => void;
  setSearchResult: (value: SetStateAction<SearchResponse>) => void;
  handleClose: () => void;
}) => {
  const infinifyRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const target = infinifyRef.current;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (target) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (
            entry.isIntersecting &&
            isInfinity &&
            page < Math.ceil(searchResult.count / 10)
          ) {
            setPage((prev) => prev + 1);
          }
        },
        {
          threshold: 0.3,
        }
      );
      observerRef.current.observe(target);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isInfinity]);

  return (
    <div className="w-full h-[calc(100%-49px)] pb-2 px-1 overflow-y-scroll overflow-x-hidden scroll-visible ">
      {isInfinity &&
        searchResult.list.map((item) => (
          <ResultItem key={item.id} foodData={item} handleClose={handleClose} />
        ))}
      <div className=" w-full h-1" ref={infinifyRef}></div>
    </div>
  );
};

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
