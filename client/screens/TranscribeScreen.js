import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  const [selectedAudio, setSelectedAudio] = useState(null);

  const pickAudio = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });

      if (result.type === 'success') {
        setSelectedAudio(result);
        console.log('Audio file selected:', result.name);
      } else if (result.type === 'cancel') {
        console.log('User canceled file selection');
      } else {
        console.error('Failed to pick an audio file');
      }
    } catch (error) {
      console.error('Error picking audio file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickAudio}>
        <Text>Pick an Audio File</Text>
      </TouchableOpacity>
      {selectedAudio && (
        <>
          <Text>Selected Audio File: {selectedAudio.name}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});
