export function checkBmi(bmi: number) {
  // < 18.5 저체중 파
  // < 23 정상 초
  // < 25 과체중 주
  // < 25 비만 빨
  if (0 < bmi && bmi < 18.5) {
    return { text: "저체중", status: "less" };
  }
  if (18.5 <= bmi && bmi < 23) {
    return { text: "정상", status: "safe" };
  }
  if (23 <= bmi && bmi < 25) {
    return { text: "과체중", status: "warning" };
  }
  if (25 <= bmi) {
    return { text: "비만", status: "danger" };
  }
  return { text: "측정불가", status: "none" };
}

export function setViewHeight() {
  const vh = window.innerHeight * 0.01;
  console.log(vh);
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
