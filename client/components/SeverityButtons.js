import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function SeverityButtons () {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };
  
    const options = [
      { id: 'option1', text: '1', bgcolor: '#34C759'},
      { id: 'option2', text: '2', bgcolor: '#FFD60A' },
      { id: 'option3', text: '3', bgcolor: '#FF3B30'},
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
            onPress={() => handleOptionSelect(option.id)}
          >
            <Text 
                style={styles.radioButtonText}
                >{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    radioButton: {
      width: 50,
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
      borderColor: 'black',
    },
  });