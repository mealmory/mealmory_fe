import {View, Text, StyleSheet} from 'react-native';

interface AverageCardProps {
  title: string;
  value: number;
}
const AverageCard = ({title, value}: AverageCardProps) => {
  return (
    <View style={cardStyle.cardBox}>
      <Text style={[cardStyle.cardText, cardStyle.title]}>{title}</Text>
      <Text style={[cardStyle.cardText, cardStyle.value]}>
        {value.toLocaleString()}
      </Text>
    </View>
  );
};

export default AverageCard;

const cardStyle = StyleSheet.create({
  cardBox: {
    width: 160,
    height: 176,
    backgroundColor: '#FFFEF7',
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 13,
    marginRight: 10,
  },
  cardText: {
    textAlign: 'center',
    color: '#000',
  },
  title: {
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    margin: 'auto',
  },
});
