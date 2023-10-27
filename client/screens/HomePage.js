import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenTool from '../components/HomeScreenTools';
import MultilingualText from '../components/MultilingualText';
import LanguagePicker from '../components/LanguagePicker';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../themes/colors';
import News from '../components/News';
import * as Location from 'expo-location';
import axios from 'axios';

export default function HomePage() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true); // Initialize loading state
  const [fetching, setFetching] = useState('Fetching...');
  const [contacts, setContacts] = useState();
  const [loadingContacts, setLoadingContacts] = useState(false);

  const emergencyMessage = `Give me all the necessary emergency contacts in ${city} ${country} as a list and do not include any other sentences as a response outside of the list`;


  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const navigation = useNavigation();

  const handleEmergency = () => {
    if(!loadingContacts){
      navigation.navigate('Emergency', { contacts });
    }
  }

  useEffect(() => {

    getLocation();
    generateContacts();
    const timeout = setTimeout(() => {
      if (city && country) {
        return; 
      } else {
        setFetching('Unavailable');
      }
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };


  }, [city, country]);

  const generateContacts = async () => {
    try {
      if (!emergencyMessage) {
        return;
      }
      setLoadingContacts(true);

      // Send the message to the server for processing
      const response = await axios.post('https://assisterapp.onrender.com/emergency/', {
        message: emergencyMessage,
      });

      if (response?.data?.emergencies) {
        const aiResponse = response.data.emergencies;
        setContacts(aiResponse);
      } else {
        console.log('Response data is missing or invalid');
      }

      setLoadingContacts(false);
    } catch (err) {
      console.error('Error:', err.message);
      setLoadingContacts(false);
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setLoadingLocation(false); // Update loading state
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      // Use MapQuest API to get city and country
      const { coords } = userLocation;
      const apiKey = '7SGURFTVzIxPsq7y6DWWqMHLwayKD6b3';

      const response = await axios.get(
        `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${coords.latitude},${coords.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
      );

      if (response.data.results && response.data.results[0].locations) {
        const address = response.data.results[0].locations[0];
        setCity(address.adminArea4);
        setCountry(address.adminArea1);
      }

      setLoadingLocation(false); // Update loading state when location is fetched
    } catch (error) {
      console.error('Error getting location:', error);
      setLoadingLocation(false); // Update loading state on error
    }
  }

  return (
    <View style={[tw`flex-1 w-full`, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={tw`flex items-center`}>
          <View style={tw`flex w-85`}>
            <View style={tw`flex-row items-start justify-between mt-2 mr-7`}>
              <View style={tw`flex w-55 justify-start`}>
                <Text style={[tw`text-5 font-bold`, { color: colors.black }]}><MultilingualText text='HomePageTitle1' /> </Text>
                <Text style={[tw`text-5 font-bold`, { color: colors.primary }]}><MultilingualText text='HomePageTitle2' /></Text>
              </View>
              <View style={tw`flex-row w-18 justify-between items-center`}>
                <TouchableOpacity>
                  <Ionicons name="language" size={20} color="black" />
                </TouchableOpacity>
                <LanguagePicker onLanguageChange={handleLanguageChange} />
                <TouchableOpacity onPress={handleEmergency}>
                  <Ionicons name="md-alert-circle" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`flex-row mt-6 items-center`}>
              <Ionicons name="md-pin" size={26} color={colors.primary} />
              <View>
                {loadingLocation ? ( // Show loading message if still fetching location
                  <Text style={tw`text-3 font-bold`}>{fetching}</Text>
                ) : (
                  <View>
                    <Text style={tw`text-3 font-bold`}>
                      {city}, {country}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={tw`mt-8`}>
              <View>
                <View style={tw`flex-row justify-between`}>
                  <HomeScreenTool name="Diagnose" icon="md-medkit" iconSize={25} />
                  <HomeScreenTool name="Assistant" icon="md-chatbox" iconSize={25} />
                </View>
                <View style={tw`flex-row justify-between`}>
                  <HomeScreenTool name="Learn" icon="md-school" iconSize={27} />
                  <HomeScreenTool name="Journal" icon="md-map" iconSize={25} />
                </View>
              </View>
            </View>
            <View style={tw`mt-8`}>
              <News />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
