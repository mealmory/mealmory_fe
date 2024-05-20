import React from 'react';
import {Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface DropdownProps<T> {
  label: string;
  placeholder: string;
  items: {label: string; value: T; key: string}[];
  value: T;
  onChange: (value: T) => void;
}

const Dropdown = <T,>({
  label,
  items,
  placeholder,
  value,
  onChange,
}: DropdownProps<T>) => {
  return (
    <View>
      <Text>{label}</Text>
      <RNPickerSelect
        items={items}
        itemKey={label}
        value={value}
        onValueChange={onChange}
        placeholder={{label: placeholder, value: ''}}
      />
    </View>
  );
};

export default Dropdown;
