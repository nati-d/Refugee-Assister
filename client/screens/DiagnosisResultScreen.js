import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons


export default function DiagnosisResultScreen({ route, navigation }) {
  const { diseaseName, details, treatment, recommendation } = route.params;
  const [activeTab, setActiveTab] = useState('Details'); // Initialize with 'Details'

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      {/* Go Back button */}
      <TouchableOpacity style={tw`mt-7 ml-4 absolute z-10`} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={32} color="#007bff" />
      </TouchableOpacity>

      <View style={tw`w-full mt-2`}>
        <Image source={require('../assets/Doctor.png')} style={tw`w-full h-80`} />
      </View>
      <View style={tw`h-20 bg-blue-400 w-full -mt-7 rounded-t-3xl flex px-4`}>
        <Text style={tw`mt-4 text-lg font-bold text-white`}>{diseaseName}</Text>
      </View>
      <View style={tw`h-20 bg-white w-full -mt-5 rounded-t-3xl h-full py-3 px-3`}>
        <View style={tw`flex flex-row justify-around`}>
          <TouchableOpacity onPress={() => handleTabChange('Details')} style={[tw`px-2 py-1`, activeTab === 'Details' ? { backgroundColor: 'white' } : {}]}>
            <Text style={[tw`text-sm font-semibold`, activeTab === 'Details' ? { color: '#007bff' } : { color: 'gray' }]}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabChange('Treatment')} style={[tw`px-2 py-1`, activeTab === 'Treatment' ? { backgroundColor: 'white' } : {}]}>
            <Text style={[tw`text-sm font-semibold`, activeTab === 'Treatment' ? { color: '#007bff' } : { color: 'gray' }]}>Treatment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabChange('Recommendation')} style={[tw`px-2 py-1`, activeTab === 'Recommendation' ? { backgroundColor: 'white' } : {}]}>
            <Text style={[tw`text-sm font-semibold`, activeTab === 'Recommendation' ? { color: '#007bff' } : { color: 'gray' }]}>Recommendation</Text>
          </TouchableOpacity>
        </View>
        <View>
          {activeTab === 'Details' && (
            <View>
              <View style={tw`flex flex-row gap-20 m-auto mt-4`}>
              <Image source={require('../assets/stethoscope-2-svgrepo-com.png')} style={tw`w-10 h-10 `}/>
                <Image source={require('../assets/health-checklist-svgrepo-com.png')} style={tw`w-10 h-10 `}/>
              </View>
              <Text style={tw`text-base text-black font-bold mt-4`}>Details</Text>
              <Text style={tw`text-sm text-gray-600 font-regular mt-3`}>{details}</Text>
            </View>
          )}
          {activeTab === 'Treatment' && (
            <View>
               <View style={tw`flex flex-row gap-20 m-auto mt-4`}>
              <Image source={require('../assets/pill-svgrepo-com.png')} style={tw`w-10 h-10 `}/>
                <Image source={require('../assets/heal-svgrepo-com.png')} style={tw`w-10 h-10 `}/>
              </View>
              <Text style={tw`text-base text-black font-bold mt-3`}>Treatment</Text>
              <Text style={tw`text-sm text-gray-600 font-regular mt-3`}>{treatment}</Text>
            </View>
          )}
          {activeTab === 'Recommendation' && (
            <View>
              <View style={tw`flex flex-row gap-20 m-auto mt-4`}>
              <Image source={require('../assets/hospital-ambulance-svgrepo-com.png')} style={tw`w-10 h-10 `}/>
                <Image source={require('../assets/location-svgrepo-com.png')} style={tw`w-10 h-10 `}/>
              </View>
              <Text style={tw`text-base text-black font-bold mt-3`}>Recommendation</Text>
              <Text style={tw`text-sm text-gray-600 font-regular mt-3`}>{recommendation.Message}</Text>
              <TouchableOpacity style={[tw`w-[90%] flex ml-auto py-2 rounded-full mt-5 bg-blue-400`]}>
                <Text style={tw`text-center text-base font-bold text-white`}>{recommendation.HospitalInfo.HospitalName}</Text>
                <Text style={tw`text-center text-sm font-regular text-white`}>{recommendation.HospitalInfo.Location}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
