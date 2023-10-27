import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreateJournal({user}) {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.17:3000/journals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content: story,
          userEmail: user.email,
        }),
      });

      if (response.status === 201) {
        navigation.navigate('Journal');
      } else {
        console.error('Failed to save journal entry');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Journal')}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>
      <Text style={styles.heading}>Create Journal Entry</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a title for your jornal"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.storyInputContainer}>
        <Text style={styles.label}>Story:</Text>
        <TextInput
          style={styles.storyInput}
          placeholder="Write Something about story"
          multiline
          value={story}
          onChangeText={(text) => setStory(text)}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#007bff',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  storyInputContainer: {
    marginBottom: 20,
    flex: 1,
  },
  storyInput: {
    height: '100%', 
    borderColor: '#007bff',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'orange',
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'flex-end',
    width:'60%',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
