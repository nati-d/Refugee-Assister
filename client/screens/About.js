import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'

export default function About() {
  return (
    <View style={tw`bg-white flex flex-1 px-3`}>
      <View>
        <Text style={tw`text-center text-lg mt-3 font-semibold`}>About Our App</Text>
        <View style={tw`items-center`}>
            <Image source={{uri:'https://res.cloudinary.com/dm9wxgkgg/image/upload/v1698507938/Assister-Images/ma3rony4opbds5i2g6oh.jpg'}} style={tw`w-50 h-50 `}/>
        </View>
        <Text style={tw`text-sm text-gray-600 font-bold text-center`}>Version: 1.0.0</Text>
        <View>
            <Text style={tw`text-sm font-bold mt-3`}>Description:</Text>
            <Text style={tw`text-sm font-regular mt-3`}>Refugee Assister is a mobile application designed to provide essential support and resources for refugees and displaced individuals. Our mission is to empower refugees by offering tools, information, and assistance in their journey towards stability and self-sufficiency.</Text>
        </View>
        <View>
            <Text style={tw`text-sm font-bold mt-3`}>Acknowledgments:</Text>
            <Text style={tw`text-sm font-regular mt-3`}>We'd like to acknowledge the open-source libraries and resources that have contributed to this app. Their support has been invaluable in our mission to assist refugees.</Text>
        </View>
      </View>
    </View>
  )
}