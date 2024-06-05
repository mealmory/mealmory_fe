import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import MainTaps from './MainTabs';
import MealPlanDetailByTime from '../screens/MealPlanDetailByTime';
import {RootStackParamList} from './navigation';

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <RootStack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerTitleAlign: 'center',
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <RootStack.Screen
        name="MainTab"
        component={MainTaps}
        options={{headerShown: false}}
      />
      {/* common screens */}
      <RootStack.Screen
        name="MealPlanByTime"
        component={MealPlanDetailByTime}
        options={({route}) => ({title: route.params.time})}
      />
    </RootStack.Navigator>
  );
}
