import React from 'react';
import {TermsScreenProps} from '../../navigation/navigation';
import {Button, View} from 'react-native';

export default function TermsOfUseScreen({navigation}: TermsScreenProps) {
  return (
    <View>
      <Button
        title="이용 약관 등 동의"
        onPress={() => navigation.navigate('AddInfo')}
      />
    </View>
  );
}
