import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'
import HomeScreenTool from '../components/HomeScreenTools';
import SubTitle from '../components/SubTitles';
import News from '../components/News';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../themes/colors.js'

export default function HomePage() {
  const navigation = useNavigation()
  return (
    <View style={[tw `flex-1`, { backgroundColor: colors.background }]}>
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
              <View>
                <Text style={tw `text-gray-500 text-4 font-bold`}>USA</Text>
                <Text style={tw `text-gray-400 text-3`}>Silver Spring Virginia</Text>
              </View>
            </View>
            <View style={tw `mt-8`}>
              {/* <SubTitle title="Tools" /> */}
              <View style={tw `flex-row items-center justify-between mt-5`}>
                <HomeScreenTool name="Checker" page="Diagnosis" icon="md-medkit" iconSize={36} />
                <HomeScreenTool name="Assistant" page="Chatbot" icon="md-chatbox" iconSize={36} />
                <HomeScreenTool name="Learn" page="" icon="md-school" iconSize={40} />
                <HomeScreenTool name="Progress" page="" icon="md-trending-up" iconSize={40} />
              </View>
            </View>
            <View style={tw `mt-15`} >
              <SubTitle title="Recent News" />
              <ScrollView style={tw `flex-row`} horizontal>
                <News />
                <News />
                <News />
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