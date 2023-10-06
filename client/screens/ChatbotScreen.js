import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../themes/colors';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import BotImg from '../assets/images/photo_2023-09-22_09-40-16.jpg'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

export default function ChatbotScreen() {
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState([])
    const navigation = useNavigation()

    const handleSend = async() => {
      try{
        console.log("Button Clicked")
        const response = await axios.post("http://196.168.1.8:3000/chat", {message:message})
        const ai = response.data.response
        console.log("Response data:", response.data);

        console.log(ai)

        setMessage("")

      }catch(err){
        console.log("Error:", err.message)
      }
    }
  return (
    <View style={tw`flex-1 relative mt-7`}>
      <View style={[tw`h-20 justify-center`, styles.container]}>
        <View style={tw`flex-row items-center `}>
          <TouchableOpacity style={tw`bg-white ml-3 mr-4 rounded-xl`} onPress={() => navigation.navigate("Home")} >
            <Ionicons name="arrow-back-outline" size={35} color={colors.primary} style={tw``} />
          </TouchableOpacity>
            <Image source={BotImg} style={tw`w-10 h-10 rounded-full`}/>
            <Text style={tw`ml-3 font-extrabold text-2xl text-white`}>Assister</Text>
        </View>
      </View>

      {/* Second View (Scrollable) */}
      <ScrollView style={tw`flex-1 border`}>
  <View style={[styles.grayContainer, { borderTopLeftRadius: 20, borderTopRightRadius: 20 }]}>
    {/* Content of the second view */}
    {/* Add your chat content here */}
  </View>
</ScrollView>


      {/* Third View (Fixed at Bottom) */}
      <View style={tw`bg-white flex-row w-full absolute bottom-0 h-15 items-center py-3 px-3 pr-9`}>
        <View style={tw`flex-row h-10 w-full border border-gray-400 items-center rounded-3xl overflow-hidden px-2`} >
            <TextInput placeholder='Type your message...' value={message}onChangeText={(text) => setMessage(text)} style={[tw`flex-1 h-9`, styles.grayContainer]}/>
            <TouchableOpacity onPress={()=> handleSend()}>
                <Ionicons name="md-send" size={24} color={colors.black} />
            </TouchableOpacity>
        </View>
        <View style={tw`p-1 ml-1 rounded-full`}>
            <TouchableOpacity>
                <FontAwesome name="microphone" size={24} color={colors.primary} />
            </TouchableOpacity>
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
});
