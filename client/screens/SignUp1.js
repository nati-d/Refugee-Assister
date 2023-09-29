import { Text, View, TextInput, Alert } from "react-native"
import tw from 'twrnc';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import React from "react";

const SignUp1 = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleNext = () => {

        navigation.navigate('SignUp2')

      };

    return (
        <View style={tw `flex-1 justify-center items-center bg-white`}>
            <View style={tw `flex items-center mt-20`}>
                <Text style={tw `text-5 font-bold`}>Let's Get Started!</Text>
                <Text>Begin Your Journey. Sign Up Now.</Text>
            </View>
            <View style={tw `w-80`}>
                <TouchableOpacity style={tw `mt-10`}>
                    <TextInput 
                        placeholder='Full Name'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300`}
                        value={name}
                        onChangeText={setName}                    
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <TextInput 
                        placeholder='Email'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300 mt-7`}
                        value={email}
                        onChangeText={setEmail}                    
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <TextInput 
                        placeholder='Password'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300 mt-7`}
                        value={password}
                        onChangeText={setPassword}                    
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <TextInput 
                        placeholder='Confirm Password'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300 mt-7`}
                        value={cPassword}
                        onChangeText={setCPassword}                    
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <TextInput 
                        placeholder='Phone'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300 mt-7`}
                        value={phone}
                        onChangeText={setPhone}                    
                    />
                </TouchableOpacity>

            </View>
            <View style={tw `flex justify-center mt-20`}>
                    <TouchableOpacity style={tw `w-60 bg-blue-400 rounded-full`}
                        onPress={handleNext}
                    >
                        <Text style={tw `text-white font-bold text-center p-5`}>Next</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default SignUp1;