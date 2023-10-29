import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import MultilingualText from './MultilingualText';

/**
 * SeveritySlider component that allows the user to select the severity level.
 * @param {function} onSelectSeverity - Callback function to handle the selected severity.
 */
export default function SeveritySlider({ onSelectSeverity }) {
  const [selectedSeverity, setSelectedSeverity] = useState(1);

  /**
   * Handle changes in the slider value and update the selected severity.
   * @param {number} value - The selected slider value.
   */
  const handleSliderChange = (value) => {
    setSelectedSeverity(value);
    onSelectSeverity(value); // Pass the selected severity back to the parent component
  };

  const minSeverity = 1;
  const maxSeverity = 3;

  const severityLevels = ['Mild', 'Medium', 'Severe']; // Define your severity level labels

  return (
    <View style={styles.container}>
      <Text style={styles.label}><MultilingualText text='SelectSeverity'/>:</Text>
      <Slider
        style={styles.slider}
        minimumValue={minSeverity}
        maximumValue={maxSeverity}
        step={1}
        value={selectedSeverity}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="#007bff"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#007bff"
      />
      <Text style={styles.sliderValue}>
        {severityLevels[Math.round(selectedSeverity) - 1]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
