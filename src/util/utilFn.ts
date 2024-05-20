export const getKeys = <T extends {}>(obj: T) =>
  Object.keys(obj) as Array<keyof T>;
