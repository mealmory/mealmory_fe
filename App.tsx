import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useAuthStore} from './src/stores/loginStore';
import {AuthNavigatr, HomeTap} from './src/navigation/Navigator';

function App(): React.JSX.Element {
  const {login, setCheckLogin} = useAuthStore();
  useEffect(() => {
    setCheckLogin();
  });

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {login ? <HomeTap /> : <AuthNavigatr />}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
