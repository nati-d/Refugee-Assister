import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function SeverityButtons({ onSelectSeverity }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelectSeverity(option); // Pass the selected severity back to the parent component
  };

  const options = [
    { id: 'option1', text: 'Mild', severity: 1, bgcolor: '#34C759' },
    { id: 'option2', text: 'Medium', severity: 2, bgcolor: '#FFD60A' },
    { id: 'option3', text: 'Worse', severity: 3, bgcolor: '#FF3B30' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.radioButton,
            selectedOption === option.id && styles.radioButtonSelected,
            { backgroundColor: option.bgcolor },
          ]}
          onPress={() => handleOptionSelect(option.severity)} // Pass the severity level on button press
        >
          <Text style={styles.radioButtonText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  radioButton: {
    width: 100, // Adjust the width to accommodate the longer button text
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  radioButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  radioButtonSelected: {
    borderWidth: 5,
    borderColor: '#888888',
  },
});
