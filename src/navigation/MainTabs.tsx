import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

const MainTab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <MainTab.Navigator initialRouteName="Home">
      <MainTab.Screen name="HomeTap" component={HomeScreen} />
    </MainTab.Navigator>
  );
};

export default MainTabs;
