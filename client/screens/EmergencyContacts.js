import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import axios from 'axios';
import { Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../themes/colors";
import MultilingualText from "../components/MultilingualText";

export default function EmergencyContacts({ route }) {
  const defaultMessage = `Give me all the necessary emergency contacts in ${route.params.city} ${route.params.country} as a list and do not include any other sentences as a response outside of the list`;
  const [message, setMessage] = useState(defaultMessage);
  const [contacts, setContacts] = useState([]);
  const scrollViewRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Automatically generate contacts when the component mounts
    generateContacts();
  }, []);

  const generateContacts = async () => {
    try {
      if (!message) {
        return;
      }
      setLoading(true);

      // Send the message to the server for processing
      const response = await axios.post('https://assisterapp.onrender.com/emergency/', {
        message: message,
      });

      if (response?.data?.emergencies) {
        const aiResponse = response.data.emergencies;
        setContacts(aiResponse);
      } else {
        console.log('Response data is missing or invalid');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error:', err.message);
      setLoading(false);
    }
  };

  const handleContactPress = (phoneNo) => {
    const phoneNumber = phoneNo.replace(/\D/g, "");
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  return (
    <View style={[tw `flex-1`, { backgroundColor: colors.background }]}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={tw `p-4`}
      >
        <View style={tw `mt-10 mb-10`}>
          <Text style={tw `text-4 font-bold text-center`}>
            <MultilingualText text="EmergencyContactsInYourArea" />
          </Text>
        </View>
        <View style={tw `items-center`}>
          <View style={tw `w-96 rounded-lg bg-purple-300 p-4`}>
            {loading ? (
              <View>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            ) : (
              <ScrollView>
                {contacts.map((contact, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tw `flex-row items-center p-2 rounded-md bg-yellow-200 mb-2`}
                    onPress={() => handleContactPress(contact.phoneNo)}
                  >
                    <MaterialIcons name="phone" size={24} color={colors.primary} style={tw `mr-2`} />
                    <Text style={tw `text-4 font-bold text-blue-700 mr-8`}>
                      {contact.name}: {contact.phoneNo}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
