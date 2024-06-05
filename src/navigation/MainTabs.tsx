import React, {Children} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {StyleSheet, Text, View} from 'react-native';
import Logo from './../assets/mealmory_logo.svg';

const MainTab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: () => (
          <View style={styles.header}>
            <Logo width={35} height={35} />
            <Text style={styles.title}>MealMory</Text>
          </View>
        ),
        headerTitleAlign: 'center',
      }}>
      <MainTab.Screen name="Home" component={HomeScreen} />
    </MainTab.Navigator>
  );
};

export default MainTabs;

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
