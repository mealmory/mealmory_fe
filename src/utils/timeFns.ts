import { Period } from "@/store/selectDateStore";

export const getTimestamp = () => {
  const timeNow = new Date();
  return Math.floor(timeNow.getTime() / 1000);
};

export const toFetchTimeString = (date: Date) => {
  const yearMonthDay = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll(". ", "-");
  const time = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return `${yearMonthDay.substring(0, yearMonthDay.length - 1)} ${time}`;
};

export const toMMddString = (date: Date) => {
  const MMdd = date
    .toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll(". ", "-");
  return MMdd.substring(0, MMdd.length - 1);
};

export const toyyMMddString = (date: Date) => {
  const MMdd = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll(". ", "-");
  return MMdd.substring(0, MMdd.length - 1);
};

export const genStartEndDate = (date: Date, period: Period) => {
  if (period === "day") return undefined;
  if (period === "week") {
    const dayOfWeek = date.getDay();

    const startDate = new Date(date);
    startDate.setDate(date.getDate() - dayOfWeek);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return {
      startDate,
      endDate,
    };
  }
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return {
    startDate,
    endDate,
  };
};
