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
