import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'
import HomeScreenTool from '../components/HomeScreenTools';
import SubTitle from '../components/SubTitles';
import News from '../components/News';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
  const navigation = useNavigation()
  return (
    <View style={tw `flex-1 bg-white`}>
      <ScrollView>
        <View style={tw `flex items-center mt-20`}>
          <View style={tw `flex w-85`}>
            <View style={tw `flex-row items-center justify-between`}>
              <Text style={tw `text-7 text-blue-400 font-bold`}>Assister</Text>
              <TouchableOpacity>
                <Ionicons name="md-notifications-outline" size={30} color="black" />
              </TouchableOpacity> 
            </View>
            <View style={tw `flex-row mt-10 items-center`}>
              <Ionicons name="md-pin" size={24} color="red" />
              <Text style={tw `text-gray-400 text-3`}>United States of America, Silver Spring Virginia</Text>
            </View>
            <View style={tw `mt-8`}>
              {/* <SubTitle title="Tools" /> */}
              <View style={tw `flex-row items-center justify-between mt-5`}>
                <HomeScreenTool name="Checker" icon="md-medkit" iconSize={36} />
                <HomeScreenTool name="Assistant" icon="md-chatbox" iconSize={36} navigation = {navigation}/>
                <HomeScreenTool name="Learn" icon="md-school" iconSize={40} />
                <HomeScreenTool name="Progress" icon="md-trending-up" iconSize={40} />
              </View>
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