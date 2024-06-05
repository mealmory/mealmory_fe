import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/MainFlow/HomeScreen';
import {StyleSheet, Text, View} from 'react-native';
import Logo from './../assets/mealmory_logo.svg';
import {genTabIcon} from '../util/svgUtil';
import {HomeTabParamList} from './navigation';

const MainTab = createBottomTabNavigator<HomeTabParamList>();

const MainTabs = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: CustomHeaderTitle,
        headerTitleAlign: 'center',
        tabBarLabelStyle: {
          color: '#000',
        },
      }}>
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: props => genTabIcon({...props, name: 'Home'}),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabs;

const CustomHeaderTitle = () => (
  <View style={styles.header}>
    <Logo width={35} height={35} />
    <Text style={styles.title}>MealMory</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    margin: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});
