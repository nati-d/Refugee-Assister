import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react'
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'
import HomeScreenTool from '../components/HomeScreenTools';
import SubTitle from '../components/SubTitles';
import News from '../components/News';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../themes/colors';


export default function HomePage() {
  const navigation = useNavigation()
  return (
    <View style={[tw `flex-1 mt-9`, {backgroundColor:colors.background}]}>

      <ScrollView>
        <View style={tw `flex items-center`}>
          <View style={tw `flex w-85`}>
            <View style={tw `flex-row items-center justify-between`}>
              <View>
                <Text style={[tw `text-6 font-bold`, {color:colors.black}]}>Your Journey, Our </Text>
                <Text style={[tw `text-6 font-bold`, {color:colors.black}]}>Guiding <Text style={{color:colors.primary}}>Hand</Text></Text>
              </View>

              <TouchableOpacity>
                <Ionicons name="md-notifications-outline" size={30} color="black" />
              </TouchableOpacity> 
            </View>
            <View style={[tw `flex-row mt-10 items-center p-3 rounded-lg justify-center`, {backgroundColor:colors.primary}]}>
              <Ionicons name="md-pin" size={24} color="red" />
              <Text style={[tw ` text-3 text-white`]}>United States of America, Silver Spring Virginia</Text>

            </View>
            
            <View style={tw `mt-8`}>
              {/* <SubTitle title="Tools" /> */}
              <View style={[tw `flex-row items-center justify-between mt-5`]}>
                <HomeScreenTool name="Checker" icon="md-medkit" iconSize={36} />
                <HomeScreenTool name="Assistant" icon="md-chatbox" iconSize={36} />
                <HomeScreenTool name="Learn" icon="md-school" iconSize={40} />
                <HomeScreenTool name="Progress" icon="md-trending-up" iconSize={40} />
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