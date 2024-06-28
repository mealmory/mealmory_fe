export const USER_INFO_FORM_LABEL = {
  inputList: [
    { label: "나이", name: "age", type: "number" },
    { label: "키", name: "height", type: "number" },
    { label: "체중", name: "weight", type: "number" },
  ],
  selectList: [
    {
      name: "gender",
      label: "성별",
      options: [
        { value: 0, label: "성별을 선택해주세요." },
        {
          value: 1,
          label: "남성",
        },
        { value: 2, label: "여성" },
      ],
    },
    {
      label: "활동량",
      name: "actLevel",
      options: [
        { value: 0, label: "활동량을 선택해주세요." },
        {
          value: 1,
          label: "앉아서 생활함 (운동을 거의 하지 않거나 전혀 안 함)",
        },
        {
          value: 2,
          label: "약간 활동적 (가벼운 운동/일주 1 ~ 2일)",
        },
        {
          value: 3,
          label: "적당히 활동적 (주당 3 ~ 5일 적당한 운동/작업)",
        },
        {
          value: 4,
          label: "매우 활동적 (주 6 ~ 7일 힘든 운동/작업)",
        },
        {
          value: 5,
          label: "추가 활동 (매우 힘든 운동 혹은 육체적인 일)",
        },
      ],
    },
  ],
};
