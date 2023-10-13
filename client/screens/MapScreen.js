import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [emergencyCenters, setEmergencyCenters] = useState([]);

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

      const apiKey = '7SGURFTVzIxPsq7y6DWWqMHLwayKD6b3';
      const response = await axios.get(
        `https://www.mapquestapi.com/search/v2/radius?key=${apiKey}&origin=${userLocation.coords.latitude},${userLocation.coords.longitude}&radius=30&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|806203&outFormat=json`
      );

      if (response.data.searchResults) {
        setEmergencyCenters(response.data.searchResults);
        console.log(emergencyCenters)
      }
    } catch (error) {
      console.error('Error getting location or emergency centers:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Your Location"
          />

          
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      
    </View>
  );
};

export default MapScreen;
