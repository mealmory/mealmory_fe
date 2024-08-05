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
