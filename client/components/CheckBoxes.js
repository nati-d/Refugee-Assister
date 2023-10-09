import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CheckBoxes({ options, selectedOptions, onCheckboxChange }) {
  return (
    <View style={styles.mainContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.checkboxContainer,
            selectedOptions.includes(option.id) && styles.checkboxSelected,
          ]}
          onPress={() => onCheckboxChange(option.id)}
        >
          <Text
            style={[
              styles.checkboxLabel,
              selectedOptions.includes(option.id) && styles.checkboxLabelSelected,
            ]}
          >
            {option.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  checkboxContainer: {
    padding: 22,
    paddingVertical: 10,
    margin: 2,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  checkboxSelected: {
    backgroundColor: 'pink',
    borderWidth: 0,
  },
  checkboxLabel: {
    color: 'white',
  },
  checkboxLabelSelected: {
    fontWeight: 'bold',
  },
});
