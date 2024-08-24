// calendar fns
const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
export const getDaysInMonth = (year: number, month: number) => {
  return [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month - 1];
};

export const formattedNumber = (num: number) => {
  return num < 10 ? `0${num}` : String(num);
};

// mealplan fns

export const toKRLocaleString = (date: Date) => {
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function menuTypeTransform(value: string): number;
export function menuTypeTransform(value: number): string;
export function menuTypeTransform(value: string | number): number | string {
  if (typeof value === "string") {
    switch (value) {
      case "아침":
        return 1;
      case "점심":
        return 2;
      case "저녁":
        return 3;
      case "야식":
        return 4;
      case "간식":
        return 4;
      default:
        return 0;
    }
  } else {
    switch (value) {
      case 1:
        return "아침";
      case 2:
        return "점심";
      case 3:
        return "저녁";
      case 4:
        return "야식";
      case 5:
        return "간식";
      default:
        return "";
    }
  }
}

export function toFixeNumberTwo(num: number) {
  return +num.toFixed(2);
}

export function calcMenuSpec(
  isSearch: boolean,
  value: number,
  amount: number,
  num: number
) {
  if (isSearch) {
    return value !== 0 ? toFixeNumberTwo((num / value) * amount) : num;
  }
  return num;
}

export function reCalcMenuSpec(
  isSearch: boolean,
  value: number,
  amount: number,
  num: number
) {
  if (isSearch) {
    return value !== 0 ? toFixeNumberTwo((num * value) / amount) : num;
  }
  return num;
}

// input fns

export const checkSpecialCharacters = (text: string) => {
  const expText = /[%=*><]/;
  return expText.test(text);
};
