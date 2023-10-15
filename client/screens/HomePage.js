import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenTool from '../components/HomeScreenTools';
import SubTitle from '../components/SubTitles';
import MultilingualText from '../components/MultilingualText';
import LanguagePicker from '../components/LanguagePicker';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../themes/colors';
import News from '../components/News';
import * as Location from 'expo-location';
import axios from 'axios';

export default function HomePage() {
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

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

      // Use MapQuest API to get city and country
      const { coords } = location;
      const apiKey = '7SGURFTVzIxPsq7y6DWWqMHLwayKD6b3';

      const response = await axios.get(
        `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${coords.latitude},${coords.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
      );

      if (response.data.results && response.data.results[0].locations) {
        const address = response.data.results[0].locations[0];
        setCity(address.adminArea4);
        setCountry(address.adminArea1);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  const handleEmergency = () => {
    navigation.navigate('Emergency', { country });
  }

  return (
    <View style={[tw `flex-1 w-full`, { backgroundColor: colors.background }]}>
      <ScrollView style={tw `mt-9`}>
        <View style={tw `flex items-center`}>
          <View style={tw `flex w-85`}>
            <View style={tw `flex-row items-center justify-between mt-5 mr-7`}>
              <View>
                <Text style={[tw `text-6 font-bold`, {color:colors.black}]}> <MultilingualText text='HomePageTitle1' /> </Text>
                <Text style={[tw `text-6 font-bold`, {color:colors.primary}]}> <MultilingualText text='HomePageTitle2' /></Text>
              </View>
              <View style={tw `flex-row w-18 justify-between items-center`}>
              <TouchableOpacity>
                  <Ionicons name="language" size={30} color="black" />
                </TouchableOpacity>
              <LanguagePicker onLanguageChange={handleLanguageChange} />
                <TouchableOpacity onPress={handleEmergency}>
                  <Ionicons name="md-alert-circle" size={30} color="black" />
                </TouchableOpacity>

              </View>
            </View>
            <View style={tw `flex-row mt-6 items-center`}>
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
                  <HomeScreenTool name="Diagnose" icon="md-medkit" iconSize={25} />
                  <HomeScreenTool name="Assistant" icon="md-chatbox" iconSize={25} />
                </View>
                <View style={tw `flex-row justify-between`}>
                  <HomeScreenTool name="Learn" icon="md-school" iconSize={25} />
                  <HomeScreenTool name="Map" icon="md-trending-up" iconSize={25} />
                </View>
              </View>
            </View>
            <View style={tw `mt-10`}>
              <SubTitle title={<MultilingualText text='RecentNews'/>} />
              <News />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
