export type ValueOf<T> = T[keyof T];

export type NavigationPropType<T> = {
  screen?: keyof T;
  params?: ValueOf<T>;
};

export type HomeTabParamList = {
  Home: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type HomeScreenProps = StackScreenProps<HomeTabParamList, 'Home'>;
