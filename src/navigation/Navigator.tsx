import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import {AuthStackParamList, HomeTabParamList} from './navigation';

const Stack = createStackNavigator<HomeTabParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
export const HomeTap = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={MainScreen} />
    </Stack.Navigator>
  );
};

export const AuthNavigatr = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};
