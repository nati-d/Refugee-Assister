import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios'; // Import Axios
import { colors } from '../themes/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfilePage({ user }) {

  const [avatar, setAvatar] = useState(''); // Initialize with an empty string
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUser();
  }, []); // Removed [firstName] as it's not needed here

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchUser = async () => {
    try {
      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await axios.get('https://assisterapp.onrender.com/getUser', {
        params: { userEmail: user.email }, // Pass the user's email as a query parameter
      });

      if (response?.data?.user) {
        setFirstName(response.data.user.firstName);
        setEmail(response.data.user.email);
        setAvatar(response.data.user.firstName.charAt(0)); // Set the avatar here
      }
    } catch (err) {
      console.error('Error fetching user:', err.message);
    }
  };

  return (
    <View style={tw`flex-1 items-center bg-white`}>
          <LinearGradient
            colors={[colors.primary, '#FF6A6A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        style={tw`w-full h-100 flex items-center`}
      >
        <Text style={tw `mt-6 text-15  font-bold text-white`}>Assister</Text>
        <View style={tw `flex justify-center mt-15 bg-gray-800 w-40 h-40 rounded-full`}>
          <Text style={tw `text-center text-12 font-bold text-white`}>{avatar}</Text>
        </View>
      </LinearGradient>
      <View style={tw`relative bg-white flex-1 w-full`}>
        <View style={tw`absolute w-full flex-1 -mt-6 bg-white p-8 rounded-t-3xl`}>
          <Text style={tw`font-bold text-3xl`}>{firstName}</Text>
          <Text style={tw`font-semibold text-base text-gray-500`}>{email}</Text>
          <TouchableOpacity onPress={handleLogout} style={tw`bg-red-600 w-[75%] m-auto py-3 rounded-t-md rounded-b-md mt-30`}>
            <Text style={tw`text-center text-white font-semibold`}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
