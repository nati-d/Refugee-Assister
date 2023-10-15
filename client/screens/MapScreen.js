import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [restaurantNames, setRestaurantNames] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      console.log('User Location:', userLocation.coords); // Debug user's location

      // Make a request to the MapQuest Search API for restaurants near Nairobi, Kenya
      const apiKey = '7SGURFTVzIxPsq7y6DWWqMHLwayKD6b3'; // Replace with your MapQuest API key
      const response = await fetch(
        `https://www.mapquestapi.com/search/v2/radius?key=${apiKey}&origin=Tokyo,+Japan&radius=3000&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|801101&outFormat=json`
      );

      const data = await response.json();

      console.log('API Response:', data); // Debug API response

      if (data.searchResults) {
        const names = data.searchResults.map((restaurant) => restaurant.name);
        setRestaurantNames(names);

        console.log('Restaurant Names:', names); // Debug restaurant names
      }
    } catch (error) {
      console.error('Error getting location or restaurant data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <ScrollView style={styles.restaurantList}>
          {restaurantNames.map((name, index) => (
            <View key={index} style={styles.restaurantItem}>
              <Text>{name}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restaurantList: {
    flex: 1,
    backgroundColor: 'white',
  },
  restaurantItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
});

export default MapScreen;
