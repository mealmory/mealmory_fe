export const getTimestamp = () => {
  const timeNow = new Date();
  return Math.floor(timeNow.getTime() / 1000);
};

export const toFetchTimeString = (date: Date) => {
  const time = date.toISOString().split("T");
  return time[0] + " " + time[1].slice(0, 8);
};
