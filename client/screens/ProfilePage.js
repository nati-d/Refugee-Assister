import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios'; // Import Axios

export default function ProfilePage({ user }) {
  const [userData, setUserData] = useState({}); // State to store user data

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
        setUserData(response.data.user);
      }
    } catch (err) {
      console.error('Error fetching user:', err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); 
    return (
        <View style={tw`flex-1 items-center bg-white `}>
            <View style={tw`w-full h-100 `}>
                <Image source={require("../assets/portrait.jpg")} style={tw`w-full h-full`} />
            </View>
            <View style={tw`relative bg-white flex-1 w-full`}>

            <View style={tw`absolute w-full flex-1 -mt-6 bg-white p-5 rounded-t-3xl`}>
                <Text style={tw`font-bold text-3xl`}>{userData.firstName}</Text>
                <Text style={tw`font-semibold text-base`}>{userData.email}</Text>
                <TouchableOpacity onPress ={handleLogout}style={tw`bg-red-600 w-[75%] m-auto py-3 rounded-t-md rounded-b-md mt-10`}>
                    <Text style={tw`text-center text-white font-semibold`}>Sign out</Text>
                </TouchableOpacity>
                

            </View>
            </View>

        </View>
    );
}
