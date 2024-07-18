"use client";

import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { useState } from "react";

const DATA = [];

const MenuSearchField = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="w-[97%] h-[95%] mx-auto rounded-xl shadow-border overflow-x-hidden overflow-y-scroll pb-3">
      <div className="w-full border-b flex items-center p-3">
        <input
          className="flex-1"
          type="text"
          placeholder="검색할 메뉴 이름을 입력해주세요."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <BsSearch size={20} />
      </div>
      <div className="w-full px-3 bg-gray-50">
        <button className="w-full border-b border-black p-2 py-3 flex items-center justify-between rounded-none">
          <p>직접 입력</p>
          <small className="text-xs">
            *검색 결과가 없는 경우 선택해주세요*
          </small>
        </button>
        {/* 검색 결과 */}
        {Array.from({ length: 15 }, (_, i) => i).map((i) => (
          <ResultItem key={i} />
        ))}
      </div>
    </div>
  );
};

export default MenuSearchField;

const ResultItem = () => {
  return (
    <button className="w-full p-2 py-3 flex items-center justify-between rounded-lg bg-white dark:bg-cusdark shadow-border mt-2">
      <p>메뉴 이름</p>
      <p>제조사</p>
    </button>
  );
};
