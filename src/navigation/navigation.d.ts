import {StackScreenProps} from '@react-navigation/stack';

export type ValueOf<T> = T[keyof T];

export type NavigationPropType<T> = {
  screen?: keyof T;
  params?: ValueOf<T>;
};

export type RootStackParamList = {
  MainTab: undefined;
  MealPlanByTime: {time: string};
  MealPlanByDay: {day: string};
};

export type HomeTabParamList = {
  Home: undefined;
  Grapg: undefined;
  Profile: undefined;
  More: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Trems: undefined;
  AddInfo: undefined;
};

// HomeTabs
export type HomeScreenProps = StackScreenProps<HomeTabParamList, 'Home'>;
// AuthStack
export type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'>;
export type TermsScreenProps = StackScreenProps<AuthStackParamList, 'Terms'>;
export type AddInfoScreenProps = StackScreenProps<
  AuthStackParamList,
  'AddInfo'
>;
// CommonScreens
export type MealPlanByTimeProps = StackScreenProps<
  RootStackParamList,
  'MealPlanByTime'
>;
