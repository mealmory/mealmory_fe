import {StyleSheet, Text, View} from 'react-native';
interface CaloryBarProps {
  type: 'amr' | 'total';
  calory: number;
  percent: number;
}
const CaloryBar = ({type, calory, percent}: CaloryBarProps) => {
  const formattedCalory = calory.toLocaleString();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'amr' ? '일일 권장 칼로리' : '현재까지 섭취 칼로리'}
      </Text>
      <View style={styles.rowBox}>
        <View
          style={[
            {width: `${percent}%`},
            styles.valueBar,
            type === 'amr' ? styles.totalBar : styles.currentBar,
          ]}>
          {percent > 30 && <Text style={styles.text}>{formattedCalory}</Text>}
        </View>
        {percent <= 30 && <Text style={styles.text}>{formattedCalory}</Text>}
      </View>
    </View>
  );
};

export default CaloryBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  rowBox: {
    width: '100%',
    flexDirection: 'row',
  },
  valueBar: {
    paddingVertical: 10,
    borderRadius: 13,
  },
  totalBar: {
    backgroundColor: '#F6E54D',
  },
  currentBar: {
    backgroundColor: '#FFE3C9',
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginBottom: 3,
  },
});
