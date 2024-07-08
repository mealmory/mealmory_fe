export function genTempDto<T>(data: T) {
  return {
    result: "Y",
    code: 0,
    message: "Success",
    data: data,
  };
}
