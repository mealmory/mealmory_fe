import {Pressable, StyleSheet, Text, View} from 'react-native';

interface TableProps {
  thList: [string, string];
  tableData: {[key: string]: number};
  handleDetailPress: (time: string) => void;
}

const Table = ({thList, tableData, handleDetailPress}: TableProps) => {
  return (
    <View style={styles.table}>
      <View style={[styles.tr]}>
        {thList.map((th, i) => (
          <Text
            key={th}
            style={[
              styles.tText,
              styles.tdBox,
              i === 0 ? styles.tdl : styles.tdr,
            ]}>
            {th}
          </Text>
        ))}
      </View>
      {Object.keys(tableData).map(key => {
        return (
          <View key={key} style={[styles.tr]}>
            <Text style={[styles.tText, styles.tdl, styles.tdBox]}>{key}</Text>
            <Pressable
              style={[styles.tdr, styles.tdBox]}
              onPress={() => handleDetailPress(key)}>
              <Text style={[styles.pressableData, styles.tText]}>
                {tableData[key].toLocaleString()}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  table: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 13,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    backgroundColor: '#FFFEF7',
    marginTop: 20,
  },
  tText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  tdBox: {
    padding: 12,
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  tr: {
    flexDirection: 'row',
    flex: 1,
  },
  tdl: {
    flex: 1,
  },
  tdr: {
    flex: 2,
  },
  pressableData: {
    color: '#F8B301',
    textDecorationLine: 'underline',
    textDecorationColor: '#F8B301',
  },
});
