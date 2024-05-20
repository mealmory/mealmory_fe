import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthStackParamList} from './navigation';
import LoginScreen from '../screens/AuthFlow/LoginScreen';
import TermsOfUseScreen from '../screens/AuthFlow/TermsOfUseScreen';
import AddInfoScreen from '../screens/AuthFlow/AddInfoScreen';

const Auth = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Auth.Navigator initialRouteName="Login">
      <Auth.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Auth.Screen
        name="Trems"
        component={TermsOfUseScreen}
        options={{headerShown: false}}
      />
      <Auth.Screen
        name="AddInfo"
        component={AddInfoScreen}
        options={{headerShown: false}}
      />
    </Auth.Navigator>
  );
};
export default AuthNavigator;
