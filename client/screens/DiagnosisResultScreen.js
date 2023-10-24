import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { colors } from '../themes/colors';
import MultilingualText from '../components/MultilingualText';
import { LocationActivityType } from 'expo-location';

export default function DiagnosisResultScreen({ route, navigation }) {
  const { diagnosisResult, latitude, longitude, hospitalName, city } = route.params;

  // Function to navigate to MapScreen with latitude and longitude
  const navigateToMapScreen = () => {
    navigation.navigate('Map', { latitude, longitude, hospitalName, city });
    console.log(latitude," ", longitude)
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow items-center`}
      style={{ backgroundColor: colors.background }}
    >
      <View style={tw`w-90 mt-8`}>
        <Text style={tw`text-6 text-center mb-5`}>
          <MultilingualText text="DRS-Title" />
        </Text>
        <View style={tw`mt-4`}>
          <Text style={tw`text-5 ml-5`}>
            <MultilingualText text="Result" />
          </Text>
          <View style={tw`bg-white p-5 mt-2 border border-2 border-gray-300 rounded-5`}>
            <Text>{diagnosisResult}</Text>
          </View>
        </View>

        {/* Button to navigate to MapScreen */}
        <TouchableOpacity onPress={navigateToMapScreen} style={tw`bg-blue-500 mt-5 p-3 rounded-5`}>
          <Text style={tw`text-white text-center`}>
            <MultilingualText text="View on Map" />
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
