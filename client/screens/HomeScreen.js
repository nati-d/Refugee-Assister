import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import tw from 'twrnc';

const myImage = require('../assets/images/welcome.png')

export default function Welcome({ navigation }) {

  return (
    <View style={tw `flex-1 justify-center items-center bg-white`}>
        <View style={tw `flex items-center mt-10`}>
            <Image 
                source={myImage}
                style={tw `w-80 h-80`}
                resizeMode='contain'
            />
        </View>
        <View style={tw `flex w-80`}>
            <Text style={tw `text-6 font-bold text-center`}>
                Welcome!
            </Text>
            <Text style={tw `mt-4 text-center`}> 
                Sign Up or Sign In for Personalized Support In Your Journey
            </Text>
            <View style={tw `mt-20`}>
                <TouchableOpacity
                    style={tw `bg-blue-400 p-5 rounded-2`}
                    onPress={() => navigation.navigate('SignUp1')}
                >
                    <Text style={tw `font-bold text-white text-center`}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw `bg-white p-5 mt-4 rounded-2 border border-black`}
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={tw `font-bold text-blue-400 text-center`}>Sign In</Text>
                </TouchableOpacity>
            </View>
           
        </View>
            
    </View>
  );
}