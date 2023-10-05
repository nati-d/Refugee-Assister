import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'
import HomeScreenTool from '../components/HomeScreenTools';
import SubTitle from '../components/SubTitles';
import News from '../components/News';

export default function HomePage() {
  return (
    <View style={{ backgroundColor: '#F8F8F8' }}>
      <ScrollView>
        <View style={tw `flex items-center mt-20`}>
          <View style={tw `flex w-85`}>
            <View style={tw `flex-row items-center justify-between`}>
                <Text style={tw `text-7 font-bold`}>Your Journey, Our Guiding Hand</Text>
              <TouchableOpacity>
                <Ionicons name="md-notifications-outline" size={30} color="black" />
              </TouchableOpacity> 
            </View>
            <View style={tw `flex-row mt-10 items-center`}>
              <Ionicons name="md-pin" size={24} color="red" />
              <View style={tw ``}>
                <Text style={tw `text-3 font-bold`}>USA,</Text>
                <Text style={tw `text-gray-400 text-3`}>Silver Spring Virginia</Text>
              </View>
            </View>
            <View style={tw `mt-8`}>
              <View style={tw `flex-row items-center justify-between mt-5`}>
                <HomeScreenTool name="Checker" icon="md-medkit" />
                <HomeScreenTool name="Assistant" icon="md-chatbox" />
                <HomeScreenTool name="Learn" icon="md-school" />
                <HomeScreenTool name="Progress" icon="md-trending-up" />
              </View>
            </View>
            <View style={tw `mt-15`}>
              <SubTitle title="Demo" />
              <ScrollView horizontal>
                <News />
                <News />
                <News />
                <News />
              </ScrollView>
            </View>
            <View style={tw `mt-15 mb-10`}>
              <SubTitle title="Recent News" />
              <News />
              <News />
              <News />
              <News />
              <News />
              <News />
              <News />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}