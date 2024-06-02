import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuthStore} from '../stores/loginStore';
import {HomeScreenProps} from '../navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CaloryBar from '../components/CaloryBar';

import {AVG_TITLE} from '../contands/mainFlowContands';
import AverageCard from '../components/AverageCard';
import Table from '../components/Table';

export default function HomeScreen({navigation}: HomeScreenProps) {
  const {setLogin} = useAuthStore();

  const data = {
    avg: {
      bmi: 23.5,
      bmr: 1234567,
      weight: 70,
    },
    user: {
      totalCalory: 1234567,
      amr: 1425636,
    },
    date: '2024-04-12',
  };

  const planData = {
    '08:00': 1234567,
    '12:00': 1234567,
    '18:00': 1234567,
    '20:00': 1234567,
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* calory bar chart */}
      <View style={[styles.section, styles.calorySection]}>
        <CaloryBar type={'amr'} calory={data.user.amr} percent={100} />
        <CaloryBar
          type={'total'}
          calory={data.user.totalCalory}
          percent={(data.user.totalCalory / data.user.amr) * 100}
        />
      </View>
      {/* average data card */}
      <View style={[styles.section, styles.cardSection]}>
        <Text style={styles.sectionText}>평균 데이터</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardList}>
          {Object.keys(data.avg).map(key => {
            return (
              <AverageCard
                key={key}
                title={AVG_TITLE[key as keyof typeof data.avg]}
                value={data.avg[key as keyof typeof data.avg]}
              />
            );
          })}
        </ScrollView>
      </View>
      {/* meal plan table */}
      <View style={[styles.section]}>
        <Text style={styles.sectionText}>오늘 식단 목록</Text>
        <Pressable
          style={({pressed}) => [
            {backgroundColor: pressed ? '#f6f2c9' : '#FFFBD3'},
            styles.button,
          ]}>
          <Text style={styles.buttonText}>식단 추가하기</Text>
        </Pressable>
        <Table thList={['시간', '칼로리']} tableData={planData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  section: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 60,
  },
  calorySection: {
    gap: 10,
  },
  cardSection: {
    flex: 1,
  },
  sectionText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  cardList: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    borderRadius: 13,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    padding: 12,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFB800',
    fontWeight: '700',
    textAlign: 'center',
  },
});
