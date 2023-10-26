import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import tw from 'twrnc';
import axios from 'axios';

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

  return (
    <View style={[tw `flex-1`, { backgroundColor: colors.background }]}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={tw `mt-5`}
      >
        <View style={tw `mt-10`}>
          <Text style={tw `text-6 font-bold text-center`}>
            <MultilingualText text="EmergencyContactsInYourArea" />
          </Text>
        </View>
        <View style={tw `flex items-center mt-15`}>
          <View style={tw `w-90 rounded-3 bg-blue-100 p-8`}>
            {loading ? (
              <View>
                <ActivityIndicator size="large" color="blue" />
              </View>
            ) : (
              <ScrollView>
                {contacts.map((contact, index) => (
                  <View key={index} style={tw `mb-3`}>
                    <Text style={tw `text-4 font-bold text-gray-700`}>
                      {contact.name}: {contact.phoneNo}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
