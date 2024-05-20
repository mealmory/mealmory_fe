import React from 'react';
import {KeyboardType, View, Text, TextInput, StyleSheet} from 'react-native';

interface InputProps {
  placeholder: string;
  value: string;
  title: string;
  keyboardType: KeyboardType;
  onChange: (e: string) => void;
}
const Input = ({
  placeholder,
  value,
  title,
  keyboardType,
  onChange,
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={styles.textInput}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#a9a9a9',
    paddingLeft: 10,
    fontSize: 18,
  },
});
