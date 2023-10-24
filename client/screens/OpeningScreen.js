import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const OpeningScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) {
        navigation.navigate('Home'); // Navigate to the home screen
      } else {
        navigation.navigate('Splash'); // Navigate to the splash screen
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [user, navigation]);

  return (
    <View style={[styles.container, tw`flex flex-1`]}>
     <Image source={{uri:'https://res.cloudinary.com/dm9wxgkgg/image/upload/v1698052578/Assister-Images/i1uda7rxav9y00uywtr8.jpg'}} style={styles.img}/>
    </View>
  );
};

export default OpeningScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#007bff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
   width:290,
   height:290
  }
});
