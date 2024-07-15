export const isLeapYear = (year: number) => {
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
