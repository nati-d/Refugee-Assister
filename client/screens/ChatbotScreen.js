import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import axios from 'axios';
import tw from 'twrnc';
import { Audio } from 'expo-av'; // Import the Audio module

import { colors } from '../themes/colors';
import BotImg from '../assets/images/photo_2023-09-22_09-40-16.jpg';
import ChatMessage from '../components/ChatMessage';
import MultilingualText from '../components/MultilingualText';


export default function ChatbotScreen() {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // Track recording status
  const [recording, setRecording] = useState(null); // Store recording object
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const speak = (aiText) => {
    Speech.speak(aiText);
  };

  const stopSpeaking = () => {
    Speech.stop();
    setSpeaking(false);
  };

  const handleSend = async () => {
    try {
      if (!message) {
        return;
      }
  
      setLoading(true);
  
      const response = await axios.post('http://192.168.1.16:3000/chat', {
        message: message,
      });
  
      if (response?.data?.response) {
        const aiResponse = response.data.response;
        speak(aiResponse);
        setSpeaking(true);
  
        const updatedChat = [
          ...chats,
          { role: 'user', content: message },
          { role: 'assistant', content: aiResponse },
        ];
        setChats(updatedChat);
      } else {
        console.log('Response data is missing or invalid');
      }
  
      setMessage('');
      setLoading(false);
    } catch (err) {
      console.error('Error:', err.message);
      setLoading(false);
    }
  };

  const handleStartRecording = async () => {
    try {
      const recording = new Audio.Recording(); 
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const handleStopRecording = async () => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        console.log('Recording stopped');
  
        const uri = recording.getURI();
  
        const audioData = new FormData();
        audioData.append('audio', {
          uri,
          name: 'audio.3gp',
          type: 'audio/3gp', 
        });
  
        // Send the audio data to the backend
        const response = await axios.post('http://192.168.1.8:3000/api/audio/transcribe', audioData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response?.data?.transcription) {
          const transcribedText = response.data.transcription;
          console.log('Transcribed Text:', transcribedText);
  
          const updatedChat = [
            ...chats,
            { role: 'user', content: 'Voice message' },
            { role: 'assistant', content: transcribedText },
          ];
          setChats(updatedChat);
        } else {
          console.log('Transcription data is missing or invalid');
        }
      } catch (error) {
        console.error('Failed to stop recording or transcribe:', error);
      }
    }
  };
  
  

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(scrollToBottom, [chats]);

  return (
    <View style={tw`flex-1 relative`}>
      <View style={[tw`h-30 justify-center`, styles.container]}>
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            style={tw`bg-white ml-3 mr-4 rounded-xl`}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons
              name="arrow-back-outline"
              size={35}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Image source={BotImg} style={tw`w-10 h-10 rounded-full`} />
          <Text style={tw`ml-3 font-extrabold text-2xl text-white`}>
          <MultilingualText text="Assister" />
          </Text>
        </View>
      </View>

      <ScrollView
        style={[tw`flex-1 px-2 z-5 rounded-t-2xl -mt-6 border`, styles.grayContainer]}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {chats.map((chat, index) => (
          <ChatMessage key={index} role={chat.role} content={chat.content} />
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </ScrollView>

      <View style={tw`bg-white flex-row w-full absolute bottom-0 h-17 items-center py-3 px-3 z-10`}>
        <View style={tw`flex-row h-13 w-full border border-gray-400 items-center rounded-3xl overflow-hidden px-3`}>
          <TextInput
            placeholder='Type your message...'
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={[tw`flex-1 h-13 mr-2`, styles.grayContainer]}
            editable={!loading}
          />
          {speaking ? (
            <TouchableOpacity onPress={stopSpeaking}>
              <Ionicons name="stop" size={24} color="red" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSend} disabled={loading}>
              <Ionicons name="md-send" size={24} color={colors.black} />
            </TouchableOpacity>
          )}
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  grayContainer: {
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});