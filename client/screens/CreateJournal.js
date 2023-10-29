import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CreateJournal({ user, route }) {
  // State variables to store user input for the title and story content
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const navigation = useNavigation();

  // Function to handle the form submission
  const handleSubmit = async () => {
    try {
      // Send a POST request to the server with the journal data
      const response = await fetch('https://assisterapp.onrender.com/journals', {
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

      // Check the response status and navigate accordingly
      if (response.status === 201) {
        navigation.navigate('Journal'); // Navigate to the 'Journal' screen on success
      } else {
        console.error('Failed to save journal entry'); // Log an error message on failure
      }
    } catch (error) {
      console.error('Error:', error); // Log an error if the fetch operation fails
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Journal')}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>
      <Text style={styles.heading}>Create Journal Entry</Text>

      {/* Input field for the journal title */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a title for your journal"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>

      {/* Input field for the journal story content (multiline) */}
      <View style={styles.storyInputContainer}>
        <Text style={styles.label}>Story:</Text>
        <TextInput
          style={styles.storyInput}
          placeholder="Write something about the story"
          multiline
          value={story}
          onChangeText={(text) => setStory(text)}
        />
      </View>

      {/* Submit button to trigger the handleSubmit function */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the components in the screen
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
    width: '60%',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
