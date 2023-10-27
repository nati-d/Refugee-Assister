import React, { useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import tw from 'twrnc';

import { colors } from "../themes/colors";
import MultilingualText from "../components/MultilingualText";

export default function EmergencyContacts({ route }) {

  const scrollViewRef = useRef();

  return (
    <View style={[tw `flex-1 items-center`, { backgroundColor: colors.background }]}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={tw `mt-5`}
      >
        <View style={tw `flex items-center mt-10`}>
          <Text style={tw `w-70 text-6 font-bold text-center`}>
            <MultilingualText text="EmergencyContactsInYourArea" />
          </Text>
        </View>
        <View style={tw `flex items-center mt-15`}>
          <View style={tw `w-90 rounded-3 bg-blue-100 p-8`}>

              <ScrollView>
                {(route.params.contacts).map((contact, index) => (
                  <View key={index} style={tw `mb-3`}>
                    <Text style={tw `text-4 font-bold text-gray-700`}>
                      {contact.name}: {contact.phoneNo}
                    </Text>
                  </View>
                ))}
              </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
