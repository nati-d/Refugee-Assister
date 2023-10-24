import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const destinationCoordinate = {
    latitude: 9.1450, // Replace with the actual destination latitude
    longitude: 40.489673, // Replace with the actual destination longitude
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync();
      setLocation(userLocation.coords);
      setLoading(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <WebView
        source={{
          uri: `https://locationiq.com/maps?key=YOUR_LOCATIONIQ_API_KEY&center=${location.latitude},${location.longitude}&zoom=15&markers=${location.latitude},${location.longitude};${destinationCoordinate.latitude},${destinationCoordinate.longitude}`,
        }}
        style={styles.map}
      />
      
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
  map: {
    flex: 1,
  },
});

export default MapScreen;
