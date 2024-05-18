import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import KakaoSymbol from './../assets/kakaoSymbol.svg';
import Logo from './../assets/mealmory_logo.svg';
import {useAuthStore} from '../stores/loginStore';
export default function LoginScreen() {
  const {setLogin} = useAuthStore();
  return (
    <View style={styles.conainter}>
      <View>
        <Logo width={100} height={100} style={styles.logo} />
        <Text style={styles.appTitle}>MealMory</Text>
        <Text style={styles.appDescription}>식사의 추억</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => setLogin(true)}>
        <KakaoSymbol width={30} height={27} style={styles.symbol} />
        <Text style={styles.btnText}>카카오 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conainter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FEE500',
    padding: 20,
    borderRadius: 12,
  },
  symbol: {
    marginBottom: -10,
  },
  btnText: {
    fontSize: 24,
    color: '#000000d8',
    fontWeight: '900',
  },
  appTitle: {
    fontSize: 30,
    color: '#000000d8',
    fontWeight: '900',
  },
  appDescription: {
    fontSize: 24,
    color: '#000000d8',
    fontWeight: '900',
    textAlign: 'center',
  },
  logo: {
    margin: 'auto',
  },
});
