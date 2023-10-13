import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenTool from '../components/HomeScreenTools';
import SubTitle from '../components/SubTitles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../themes/colors';
import News from '../components/News';
import * as Location from 'expo-location';
import axios from 'axios';
import MultilingualText from '../components/MultilingualText';
import LanguagePicker from '../components/LanguagePicker';

export default function HomePage() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Use LocationIQ API to get city and country
      const { coords } = location;
      const apiKey = 'pk.cee2067fb372bf264c1362fbe9ec1353'; 

      const response = await axios.get(
        `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${coords.latitude}&lon=${coords.longitude}&format=json`
      );

      if (response.data.address) {
        setCity(response.data.address.city);
        setCountry(response.data.address.country);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleEmergency = () => {
    navigation.navigate('EmergencyContacts');
  }

  return (
    <View style={[tw `flex-1`, { backgroundColor: colors.background }]}>
      <ScrollView style={tw `mt-9`}>
        <View style={tw `flex items-center`}>
          <View style={tw `flex w-85`}>
            <View style={tw `flex-row items-center justify-between mt-5`}>
              <View>
                <Text style={[tw `text-6 font-bold`, { color: colors.black }]}>
                  Your Journey, Our
                </Text>
                <Text style={[tw `text-6 font-bold`, { color: colors.black }]}>
                  Guiding <Text style={{ color: colors.primary }}>Hand</Text>
                </Text>
              </View>
              <View style={tw `flex-row w-18 justify-between`}>
                <TouchableOpacity>
                  <Ionicons name="md-notifications-outline" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEmergency}>
                  <Ionicons name="md-alert-circle" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw `flex-row mt-6`}>
              <Ionicons name="md-pin" size={32} color={colors.primary} />
              <View>
                {city && country ? (
                  <View>
                    <Text style={tw `text-3 font-bold`}>
                      {city}, {country}
                    </Text>
                  </View>
                ) : (
                  <Text style={tw `text-3 font-bold`}>Fetching location...</Text>
                )}
              </View>
            </View>
            <View style={tw `mt-10`}>
              <View>
                <View style={tw `flex-row justify-between`}>
                  <HomeScreenTool name="Checker" icon="md-medkit" iconSize={32} />
                  <HomeScreenTool name="Assistant" icon="md-chatbox" iconSize={32} />
                </View>
                <View style={tw `flex-row justify-between`}>
                  <HomeScreenTool name="Learn" icon="md-school" iconSize={36} />
                  <HomeScreenTool name="Map" icon="md-trending-up" iconSize={36} />
                </View>
              </View>
            </View>
            <View style={tw `mt-10`}>
              <SubTitle title="Recent News" />
              <News />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
