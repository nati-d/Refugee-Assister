import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import { useState } from 'react';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'
import HomeScreenTool from '../components/HomeScreenTools';
import SubTitle from '../components/SubTitles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../themes/colors';
import News from '../components/News';
import MultilingualText from '../components/MultilingualText';
import LanguagePicker from '../components/LanguagePicker';

export default function HomePage() {

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };


  const navigation = useNavigation()
  const handleEmergency = () => {
    navigation.navigate("EmergencyContacts");
  } 
  return (
    <View style={[tw `flex-1`, {backgroundColor:colors.background}]}>

      <ScrollView style={tw `mt-9`}>
        <View style={tw `flex items-center`}>
          <View style={tw `flex w-90`}>
            <View style={tw `flex-row items-center justify-between mt-5`}>
              <View>
                <Text style={[tw `text-6 font-bold`, {color:colors.black}]}> <MultilingualText text='HomePageTitle1' /> </Text>
                <Text style={[tw `text-6 font-bold`, {color:colors.primary}]}> <MultilingualText text='HomePageTitle2' /></Text>
              </View>

              <View style={tw `flex-row w-16 justify-between`}>
                <TouchableOpacity>
                  <Ionicons name="md-notifications-outline" size={26} color="black" />
                </TouchableOpacity> 
                <TouchableOpacity onPress={handleEmergency} >
                  <Ionicons name="md-alert-circle" size={28} color="black" />
                </TouchableOpacity> 
              </View>
            </View>

            <View style={tw `flex-row justify-between items-center`}>
              <View style={tw `flex-row mt-6`}> 
                <Ionicons name="md-pin" size={32} color={ colors.primary } />
                <View>
                  <Text style={tw `text-3 font-bold`}>USA </Text>
                  <Text style={tw `text-3`}>Silver Spring, Virginia</Text>
                </View>
              </View>
              <LanguagePicker onLanguageChange={handleLanguageChange} />
            </View>
            

            <View style={tw `flex items-center mt-10`}>
              <View style={tw `w-85`}>
                <View style={tw `flex-row justify-between`}>
                  <HomeScreenTool name="Checker" icon="md-medkit" iconSize={32} />
                  <HomeScreenTool name="Assistant" icon="md-chatbox" iconSize={32} />
                </View>
                <View style={tw `flex-row justify-between`}>
                  <HomeScreenTool name="Learn" icon="md-school" iconSize={36} />
                  <HomeScreenTool name="Transcribe" icon="md-trending-up" iconSize={36} />
                </View>
              </View>
            </View>
            
            <View style={tw `mt-10`}>
              <News />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}




