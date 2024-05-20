import React, {useState} from 'react';
import {AddInfoScreenProps} from '../../navigation/navigation';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import {
  ADD_INFO_DROPDOWN_ITEMS,
  ADD_INFO_LABEL,
  ADD_INFO_PLACEHOLDER,
} from '../../contands/authFlowConstands';
import {getKeys} from '../../util/utilFn';

interface UserInfo {
  gender: '' | '1' | '2';
  age: string;
  weight: string;
  height: string;
  actLevel: '' | '1' | '2' | '3' | '4' | '5';
}

export default function AddInfoScreen({navigation}: AddInfoScreenProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    gender: '',
    age: '',
    weight: '',
    height: '',
    actLevel: '',
  });
  const handleInfoChange = (
    target: keyof UserInfo,
    value: UserInfo[keyof UserInfo],
  ) => {
    setUserInfo(prev => ({...prev, [target]: value}));
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.description}>
          밀모리와 함께하기 위해 아래 정보들을 입력해 주세요.
        </Text>
      </View>
      {getKeys(userInfo).map(key => {
        if (key === 'gender' || key === 'actLevel') {
          return (
            <Dropdown
              label={ADD_INFO_LABEL[key]}
              placeholder={ADD_INFO_PLACEHOLDER.dropdown[key]}
              items={ADD_INFO_DROPDOWN_ITEMS[key]}
              value={userInfo[key]}
              onChange={<T extends UserInfo[keyof UserInfo]>(value: T) =>
                handleInfoChange(key, value)
              }
            />
          );
        } else {
          return (
            <Input
              title={ADD_INFO_LABEL[key]}
              placeholder={ADD_INFO_PLACEHOLDER.textInput[key]}
              value={userInfo[key]}
              onChange={(value: string) => handleInfoChange(key, value)}
              keyboardType="numeric"
            />
          );
        }
      })}
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(userInfo);
        }}>
        <Text style={styles.buttonTitle}>작성 완료</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFFBD3',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#75757541',
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f4af00',
    textAlign: 'center',
  },
});
