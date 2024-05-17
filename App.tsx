import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" />
    </SafeAreaView>
  );
}

export default App;
