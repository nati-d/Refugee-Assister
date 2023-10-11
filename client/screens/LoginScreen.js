import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import WelcomeImage from '../assets/images/Welcome.png'

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
      // Validate email
      if (!email) {
          setEmailError('Email is required');
          return;
      } else {
          setEmailError('');
      }
  
      // Validate password
      if (!password) {
          setPasswordError('Password is required');
          return;
      } else {
          setPasswordError('');
      }
  
      try {
          await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
          if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
              setEmailError('Invalid email address');
          } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-login-credentials') {
              setPasswordError('Incorrect password');
          } else {
              console.error('Login error:', error);
          }
      }
  }
  

    return (
        <View style={[tw`flex flex-1`, styles.container]}>
            <View style={tw`w-full`}>
                <Image source={WelcomeImage} style={[tw`w-[100%] h-50`, styles.img]} />
            </View>
            <View>
                <Text style={tw`font-extrabold text-2xl text-center text-gray-800`}>Welcome Back!</Text>
                <Text style={tw`text-base text-center text-gray-800`}>Login to your existing account of Assister</Text>
                <View style={tw`mt-5`}>
                    <Text style={tw`text-base font-bold mb-2 text-gray-800`}>Email:</Text>
                    <TextInput
                        style={[
                            tw`border rounded-md h-12 p-2 px-3 border-gray-400 text-gray-800`,
                            { borderColor: emailError ? '#FF0000' : 'gray', shadowColor: emailError ? '#FF0000' : 'transparent' },
                        ]}
                        placeholder='Your Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                    {emailError ? <Text style={tw`text-red-600`}>{emailError}</Text> : null}
                </View>
                <View style={tw`mt-2`}>
                    <Text style={tw`text-base font-bold mb-2 text-gray-800`}>Password:</Text>
                    <TextInput
                        style={[
                            tw`border rounded-md h-12 p-2 px-3 border-gray-400 text-gray-800`,
                            { borderColor: passwordError ? '#FF0000' : 'gray', shadowColor: passwordError ? '#FF0000' : 'transparent' },
                        ]}
                        placeholder='Your Password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    {passwordError ? <Text style={tw`text-red-600`}>{passwordError}</Text> : null}
                </View>
                <TouchableOpacity style={[styles.button, tw`p-4 mt-4 rounded-md shadow-md`]} onPress={handleLogin}>
                    <Text style={tw`text-white text-center font-bold`}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`flex-row mt-5`}>
                <Text style={tw`text-center`}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={tw`font-bold text-blue-600`}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
    },
    img: {
        objectFit: 'cover',
    },
});
