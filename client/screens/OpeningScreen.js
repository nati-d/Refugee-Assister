import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      <Text>Name</Text>
    </View>
  );
};

export default OpeningScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#28c2ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
