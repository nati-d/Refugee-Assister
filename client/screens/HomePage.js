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
import LocationTool from '../components/LocationTool';

export default function HomePage() {
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const navigation = useNavigation();

  const handleEmergency = () => {
    navigation.navigate('Emergency', { country });
  }

  return (
    <View style={[tw `flex-1 w-full`, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={tw `flex items-center`}>
          <View style={tw `flex w-85`}>
            <View style={tw `flex-row items-start justify-between mt-2 mr-7`}>
              <View style={tw `w-60`}>
                <Text style={[tw `text-5 font-bold`, {color:colors.black}]}><MultilingualText text='HomePageTitle1' /> </Text>
                <Text style={[tw `text-5 font-bold`, {color:colors.primary}]}><MultilingualText text='HomePageTitle2' /></Text>
              </View>
              <View style={tw `flex-row w-18 justify-between items-center`}>
              <TouchableOpacity>
                  <Ionicons name="language" size={20} color="black" />
                </TouchableOpacity>
              <LanguagePicker onLanguageChange={handleLanguageChange} />
                <TouchableOpacity onPress={handleEmergency}>
                  <Ionicons name="md-alert-circle" size={24} color="gray" />
                </TouchableOpacity>

              </View>
            </View>
            <LocationTool />
            <View style={tw `mt-8`}>
              <View>
                <View style={tw `flex-row justify-between`}>
                  <HomeScreenTool name="Diagnose" icon="md-medkit" iconSize={25} />
                  <HomeScreenTool name="Assistant" icon="md-chatbox" iconSize={25} />
                </View>
                <View style={tw `flex-row justify-between`}>
                  <HomeScreenTool name="Learn" icon="md-school" iconSize={27} />
                  <HomeScreenTool name="Map" icon="md-map" iconSize={25} />
                </View>
              </View>
            </View>
            <View style={tw `mt-8`}>
              <News />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
