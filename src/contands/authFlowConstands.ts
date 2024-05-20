// add info screen
export const ADD_INFO_LABEL = {
  gender: '성별',
  age: '나이',
  weight: '몸무게',
  height: '키',
  actLevel: '활동량',
};

export const ADD_INFO_PLACEHOLDER = {
  dropdown: {
    gender: '성별을 선택해 주세요.',
    actLevel: '활동량을 선택해 주세요.',
  },
  textInput: {
    age: '나이를 입력해 주세요.',
    weight: '몸무게를 입력해 주세요.',
    height: '키를 입력해 주세요.',
  },
};

export const ADD_INFO_DROPDOWN_ITEMS = {
  gender: [
    {label: '남성', value: '1', key: 'male'},
    {label: '여성', value: '2', key: 'female'},
  ],
  actLevel: [
    {
      label: '앉아서 생활함 (운동을 거의 하지 않거나 전혀 안 함)',
      value: '1',
      key: '1',
    },
    {label: '약간 활동적 (가벼운 운동/일주 1 ~ 2일)', value: '2', key: '2'},
    {
      label: '적당히 활동적 (주당 3 ~ 5일 적당한 운동/작업)',
      value: '3',
      key: '3',
    },
    {label: '활동적 (주 6 ~ 7일 힘든 운동/작업)', value: '4', key: '4'},
    {
      label: '매우 활동적 (매우 힘든 운동 혹은 육체적인 일)',
      value: '5',
      key: '5',
    },
  ],
};
