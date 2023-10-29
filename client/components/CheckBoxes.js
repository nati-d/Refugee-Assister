import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * CheckBoxes component for rendering a list of options with checkboxes.
 * @param {object} options - An array of option objects with 'id' and 'text' properties.
 * @param {array} selectedOptions - An array of selected option IDs.
 * @param {function} onCheckboxChange - A callback function to handle checkbox state changes.
 */
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
    padding: 5,
    margin: 2,
    borderRadius: 10, // Increased border radius for a rounded look
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    elevation: 3, // Add a subtle shadow effect
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  checkboxSelected: {
    backgroundColor: 'white',
    borderColor: '#007bff',
  },
  checkboxLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  checkboxLabelSelected: {
    color: '#007bff',
  },
});
