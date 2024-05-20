export type ValueOf<T> = T[keyof T];

export type NavigationPropType<T> = {
  screen?: keyof T;
  params?: ValueOf<T>;
};

export type RootStackParamList = {};

export type HomeTabParamList = {
  Home: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Trems: undefined;
  AddInfo: undefined;
};

export type HomeScreenProps = StackScreenProps<HomeTabParamList, 'Home'>;

export type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'>;
export type TermsScreenProps = StackScreenProps<AuthStackParamList, 'Terms'>;
export type AddInfoScreenProps = StackScreenProps<
  AuthStackParamList,
  'AddInfo'
>;
