import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import tw from 'twrnc';

const slides = [
  { id: 1, 
    title1: 'Guiding ', 
    title2: 'Resilience', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis, nisi ac fringilla fringilla, eros augue feugiat dui, at luctus eros arcu eu tellus. Duis ut leo tellus.',
    image: require('../assets/images/slide1.png') },
  { id: 2, 
    title1: 'Healing ',
    title2: 'Paths', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis, nisi ac fringilla fringilla, eros augue feugiat dui, at luctus eros arcu eu tellus. Duis ut leo tellus.',
    image: require('../assets/images/slide2.png') },
  { id: 3,
    title1: 'Chatbot ', 
    title2: 'Compass', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis, nisi ac fringilla fringilla, eros augue feugiat dui, at luctus eros arcu eu tellus. Duis ut leo tellus.',
    image: require('../assets/images/slide3.png') },
  { id: 4, 
    title1: 'Universal ',
    title2: 'Connection', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis, nisi ac fringilla fringilla, eros augue feugiat dui, at luctus eros arcu eu tellus. Duis ut leo tellus.',
    image: require('../assets/images/slide4.png') },
];

const SplashScreen = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const handleSkip = () => {
    setActiveSlide(slides.length - 1);
    navigation.navigate('HomeScreen')
  };

  return (
    <View style={tw `flex-1 justify-center items-center bg-white`}>
      <Swiper
        loop={false}
        index={activeSlide}
        onIndexChanged={index => setActiveSlide(index)}
      >
        {slides.map(slide => (
          <View 
            style={tw `flex justify-center items-center h-200`}
            key={slide.id}>
            <Image 
                style={tw `h-60`} 
                source={slide.image} 
                resizeMode='contain'
            />
            <View style={tw `flex-row mt-15`}>
                <Text style={tw `text-6 font-bold text-blue-400`}>{slide.title1}</Text>
                <Text style={tw `text-6 font-bold`}>{slide.title2}</Text>
            </View>
            <View style={tw `w-80 mt-15`}>
                <Text>{slide.description}</Text>
            </View>
          </View>
        ))}
      </Swiper>
      <View style={tw `flex-row justify-start mb-10 w-90 mt-5`}>
        <TouchableOpacity 
            style={tw `p-4 w-25`}
            onPress={handleSkip}>
          <Text style={tw `font-bold text-blue-400 text-center`}>Skip</Text>
        </TouchableOpacity>
        <View style={tw `flex-grow`} />
        <TouchableOpacity 
            style={tw `p-4 w-25 bg-blue-400 rounded-2`}
            onPress={activeSlide === slides.length - 1 ? handleSkip : handleNext }>
          <Text style={tw `font-bold text-white text-center`}>
            {activeSlide === slides.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;