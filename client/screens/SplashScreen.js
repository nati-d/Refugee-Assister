import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
    let backgroundColor;
    let borderRadius;
  
    backgroundColor = selected ? '#28c2ff' : 'gray';
    borderRadius = 6;
  
    return (
      <View
        style={{
          width: 6,  
          height: 6, 
          marginHorizontal: 3,
          backgroundColor,
          borderRadius,
        }}
      />
    );
  };
  

const Skip = ({ ...props }) => (
  <TouchableOpacity
  style={{ marginHorizontal: 10 , paddingHorizontal:14, paddingVertical:8, borderRadius:5}}
  {...props}
  >
    <Text style={{ fontSize: 13, color: '#28c2ff' }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 ,backgroundColor:'#28c2ff', paddingHorizontal:14, paddingVertical:8, borderRadius:5}}
    {...props}
  >
    <Text style={{ fontSize: 13, color: '#fff' }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity
  style={{ marginHorizontal: 10 ,backgroundColor:'#28c2ff', paddingHorizontal:14, paddingVertical:8, borderRadius:5}}
  {...props}
  >
    <Text style={{ fontSize: 13, color: 'white' }}>Finish</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("")}
      onDone={() => navigation.navigate("")}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image style={{ width: '90%', height: 250 }} source={require('../assets/photo_2023-09-22_09-40-10.jpg')} />,
          title: (
            <Text style={{fontSize:26, fontWeight:'bold', marginBottom:8}}>
              <Text style={{ color: '#28c2ff' }}>Guiding</Text> Resilience
            </Text>
          ),
          subtitle: 'Amidst the uncertainties of displacement, refugees demonstrate remarkable resilience, courage, and determination as they seek safety and a brighter future in unfamiliar lands.',
        },
        {
          backgroundColor: '#fff',
          image: <Image style={{ width: '90%', height: 250 }} source={require('../assets/photo_2023-09-22_09-40-04.jpg')} />,
          title: (
            <Text style={{fontSize:26, fontWeight:'bold', marginBottom:8}}>
              <Text style={{ color: '#28c2ff' }}>Healing</Text> Paths
            </Text>
          ),
          subtitle: 'Guiding Mental Health and Medical Wellness Toward a Balanced, Resilient, and Fulfilling Life Journey.',
        },
        {
          backgroundColor: '#fff',
          image: <Image style={{ width: '90%', height: 250 }} source={require('../assets/photo_2023-09-22_09-39-59.jpg')} />,
          title: (
            <Text style={{fontSize:26, fontWeight:'bold', marginBottom:8}}>
              <Text style={{ color: '#28c2ff' }}>Chatbot</Text> Compass
            </Text>
          ),
          subtitle: "Navigating Your Journey with AI for Smart and Helpful Conversational Guidance and Support.",
        },
        {
          backgroundColor: '#fff',
          image: <Image style={{ width: '90%', height: 250 }} source={require('../assets/photo_2023-09-22_09-39-52.jpg')} />,
          title: (
            <Text style={{fontSize:26, fontWeight:'bold', marginBottom:8}}>
              <Text style={{ color: '#28c2ff' }}>Universal</Text> Connection
            </Text>
          ),
          subtitle: "Bridging Language Barriers and Simplifying Tasks with Voice-Powered Chatbot Guidance and Support.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
