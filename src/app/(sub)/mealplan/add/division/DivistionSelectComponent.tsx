"use client";

import { useRouter } from "next/navigation";
import useMenuRegion, { MenuRegion } from "@/store/menuRegionStore";
import { useEffect } from "react";
import { CATEGORY_ITEMS } from "@/constants/mainConstants";
import useMealPlanStore from "@/store/mealPlanStore";
import MenuSearchField from "./MenuSearchField";
const DIVISION = [
  { did: 1, name: "가공 식품" },
  { did: 2, name: "가정식" },
  { did: 3, name: "외식" },
];
const DivisionSelectComponent = () => {
  const router = useRouter();
  const { menuRegion, setMenuRegion, reset } = useMenuRegion();
  const { addMeal } = useMealPlanStore();
  const regionKey =
    menuRegion.division === 1
      ? "processed"
      : menuRegion.division === 2
      ? "in"
      : "out";

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  function handlePrevClick() {
    const { division, category } = menuRegion;
    if (division === 0) {
      router.back();
    } else if (division > 0) {
      if (category === 0) {
        setMenuRegion("division", 0);
      } else {
        setMenuRegion("category", 0);
      }
    }
  }
  return (
    <div className="w-full h-full flex flex-col items-center">
      <CategoryModalHeader
        handlePrevClick={handlePrevClick}
        menuRegion={menuRegion}
      />

      {menuRegion.division === 0 ? (
        <DivisionField
          handleClickDivision={(did) => setMenuRegion("division", did)}
          handleSelfClick={() => {
            addMeal({ type: "self", did: 4 });
            router.back();
          }}
        />
      ) : menuRegion.category === 0 ? (
        <CategoryField
          regionKey={regionKey}
          handleClickCategory={(id) => setMenuRegion("category", id)}
          handleSelfClick={() => {
            addMeal({ type: "self", did: 4 });
            router.back();
          }}
        />
      ) : (
        <MenuSearchField
          handleClose={() => router.back()}
          handleSelfClick={() => {
            addMeal({ type: "self", did: 4 });
            router.back();
          }}
        />
      )}
    </div>
  );
};

export default DivisionSelectComponent;

const DivisionField = ({
  handleClickDivision,
  handleSelfClick,
}: {
  handleClickDivision: (did: number) => void;
  handleSelfClick: () => void;
}) => {
  return (
    <div className="w-full grid grid-cols-3 p-3 gap-2">
      {DIVISION.map(({ did, name }) => (
        <button
          key={did}
          className="rounded-lg shadow-border p-2 h-20 point-value break-words"
          onClick={() => handleClickDivision(did)}
        >
          {name}
        </button>
      ))}
      <button
        className="rounded-lg shadow-border p-2 h-20 point-value break-words"
        onClick={handleSelfClick}
      >
        직접 입력
      </button>
    </div>
  );
};

const CategoryField = ({
  regionKey,
  handleClickCategory,
  handleSelfClick,
}: {
  regionKey: keyof typeof CATEGORY_ITEMS;
  handleClickCategory: (id: number) => void;
  handleSelfClick: () => void;
}) => {
  return (
    <div className="w-full h-hull p-3 overflow-y-scroll grid grid-cols-4 gap-3">
      {CATEGORY_ITEMS[regionKey].map((item) => (
        <button
          key={item.id}
          className="rounded-lg shadow-border p-1 h-20 point-value break-words w-full flex flex-col items-center justify-center"
          onClick={() => handleClickCategory(item.id)}
        >
          {item.name.split(" ").map((word) => (
            <p key={word}>{word}</p>
          ))}
        </button>
      ))}
      <button
        className="rounded-lg shadow-border p-1 h-20 point-value break-words w-full flex flex-col items-center justify-center"
        onClick={handleSelfClick}
      >
        직접 입력
      </button>
    </div>
  );
};

const CategoryModalHeader = ({
  handlePrevClick,
  menuRegion,
}: {
  handlePrevClick: () => void;
  menuRegion: MenuRegion;
}) => {
  const { division, category } = menuRegion;
  const divisionTitle = DIVISION.find(({ did }) => division === did)?.name;
  const categoryTitle = CATEGORY_ITEMS[
    division === 1 ? "processed" : division === 2 ? "in" : "out"
  ].find(({ id }) => category === id)?.name;
  return (
    <div className="w-full p-3 flex items-center relative text-2xl mb-4">
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2"
        onClick={handlePrevClick}
      >
        &lt;
      </button>
      <div className="w-full flex items-center justify-center text-xl gap-3">
        {division === 0 ? (
          <p>메뉴 카테고리</p>
        ) : category === 0 ? (
          <p>{divisionTitle ?? ""}</p>
        ) : (
          <>
            <p>{divisionTitle ?? ""}</p>
            <p>&gt;</p>
            <p>{categoryTitle ?? ""}</p>
          </>
        )}
      </div>
    </div>
  );
};
