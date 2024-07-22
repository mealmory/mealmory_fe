export const MenuTypeStrToNum = <T>(value: string) => {
  switch (value) {
    case "아침":
      return 1;
    case "점심":
      return 2;
    case "저녁":
      return 3;
    case "야식":
      return 4;
    default:
      return 5;
  }
};
