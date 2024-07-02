import { BsHouse } from "@react-icons/all-files/bs/BsHouse";
import { BsHouseFill } from "@react-icons/all-files/bs/BsHouseFill";
import { BsBarChart } from "@react-icons/all-files/bs/BsBarChart";
import { BsBarChartFill } from "@react-icons/all-files/bs/BsBarChartFill";
import { BsPerson } from "@react-icons/all-files/bs/BsPerson";
import { BsPersonFill } from "@react-icons/all-files/bs/BsPersonFill";
import { BsGrid } from "@react-icons/all-files/bs/BsGrid";
import { BsGridFill } from "@react-icons/all-files/bs/BsGridFill";

export const LINK_ITEMS = [
  {
    title: "메인",
    link: "/main",
    icon: { normal: BsHouse, matched: BsHouseFill },
  },
  {
    title: "통계",
    link: "/main/graph",
    icon: { normal: BsBarChart, matched: BsBarChartFill },
  },
  {
    title: "프로필",
    link: "/main/profile",
    icon: { normal: BsPerson, matched: BsPersonFill },
  },
  {
    title: "더보기",
    link: "/main/more",
    icon: { normal: BsGrid, matched: BsGridFill },
  },
];
