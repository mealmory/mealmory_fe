import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTaps from './MainTabs';

const RootStack = createStackNavigator();

export default function RootNavigation() {
  return (
    <RootStack.Navigator initialRouteName="MainTap">
      <RootStack.Screen
        name="MainTab"
        component={MainTaps}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
}
