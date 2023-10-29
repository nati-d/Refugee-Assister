import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios';
import { colors } from '../themes/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfilePage({ user }) {
  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    fetchUser();
    fetchRandomQuote();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://assisterapp.onrender.com/getUser', {
        params: { userEmail: user.email },
      });
  
      if (response?.data?.user) {
        const { firstName, lastName, email } = response.data.user;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
  
        // Check if firstName exists before trying to get the first character
        if (firstName) {
          setAvatar(firstName.charAt(0));
        }
      }
    } catch (err) {
      console.error('Error fetching user:', err.message);
    }
  };
  

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');

      if (response.data) {
        setRandomQuote(response.data.content);
      }
    } catch (err) {
      console.error('Error fetching random quote:', err.message);
    }
  };

  return (
    <View style={tw`flex-1 items-center bg-gray-300`}>
      <View style={tw`bg-blue-800 p-5 w-full rounded-b-2xl`}>
        <Text style={tw`text-center text-white font-semibold`}>Your Profile</Text>
        <View style={tw`mt-10 bg-green-300 w-30 h-30 rounded-full mx-auto flex items-center justify-center overflow-hidden`}>
          <Text style={tw`text-4xl text-white font-bold`}>{avatar}</Text>
        </View>
        <Text style={tw`text-center mt-8 text-lg text-white font-bold`}>{firstName} {lastName}</Text>
        <Text style={tw`text-center text-sm text-white mb-12`}>{email}</Text>
      </View>

      <View style={tw`relative w-full`}>
        <View style={tw`absolute -top-10 left-5 w-[90%] h-50 z-50 bg-white rounded-t-xl rounded-b-xl flex items-center justify-center`}>
          <Text style={tw`text-center text-4 text-black`}>"{randomQuote}"</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={tw`bg-red-600 w-[75%] mx-auto  py-3 rounded-t-md rounded-b-md mt-60`}>
            <Text style={tw`text-center text-white font-semibold`}>Sign out</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
