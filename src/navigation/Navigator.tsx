import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import {HomeTabParamList} from './navigation';

const RootStack = createStackNavigator();
const Home = createStackNavigator<HomeTabParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="HomeTab"
        component={HomeTap}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
}

export const HomeTap = () => {
  return (
    <Home.Navigator initialRouteName="Home">
      <Home.Screen name="Home" component={MainScreen} />
    </Home.Navigator>
  );
};
