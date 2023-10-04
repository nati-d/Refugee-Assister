import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]); const [recording, setRecording] = React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }


  const handleSend = () => {
    //reponse
    const generateBotResponse = chatMessages => {
      // Generate bot response based on user message
      // Replace this logic with your own chatbot logic
      if (chatMessages.toLowerCase().includes('hello')) {
        return 'Hello! How can I assist you today?';
      } else if (chatMessages.toLowerCase().includes('help')) {
        return 'Sure, I am here to help. What do you need assistance with?';
      } else {
        return "I'm sorry, I didn't understand. Can you please rephrase your message?";
      }
    };
    // Handle sending user input
    const newMessage = {
      text: userInput,
      sender: 'user',
    };
    setChatMessages(prevMessages => [...prevMessages, newMessage]);
    setUserInput('');
  };

  const handleRecord = () => {
    // Handle recording user input
    console.log('Recording...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profile}>Profile</Text>
      </View>
      <View style={styles.chatArea}>
        {/* Chat messages */}
      {chatMessages.map((message, index) => (
          <View key={index} style={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))} 
      </View>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          value={userInput}
          onChangeText={text => setUserInput(text)}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="blue" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconButton} onPress={handleRecord}>
          <Ionicons name="mic" size={24} color="blue" />
        </TouchableOpacity> */}
        
         <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 50,
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 10,
  },
  iconButton: {
    marginLeft: 5,
  },
});

export default Chatbot;