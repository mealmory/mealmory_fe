export const getTimestamp = () => {
  const timeNow = new Date();
  return Math.floor(timeNow.getTime() / 1000);
};
