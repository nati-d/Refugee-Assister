import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import tw from 'twrnc'
import { FontAwesome5 } from '@expo/vector-icons';

const MapScreen = ({ route }) => {
  const { latitude, longitude ,hospitalName, city} = route.params;
 const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null); // State variable for storing the distance
  const [loading, setLoading] = useState(true);
  const [infoView, setInfoView] = useState(false)

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

      console.log('User Location:', userLocation.coords);

      // Calculate and set the initial distance when user location is available
      calculateDistance(userLocation.coords.latitude, userLocation.coords.longitude);

      setLoading(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1) => {
    if (latitude && longitude) {
      const earthRadius = 6371; // Earth's radius in kilometers
      const lat2 = latitude;
      const lon2 = longitude;
  
      // Convert latitude and longitude from degrees to radians
      const lat1Rad = (Math.PI * lat1) / 180;
      const lon1Rad = (Math.PI * lon1) / 180;
      const lat2Rad = (Math.PI * lat2) / 180;
      const lon2Rad = (Math.PI * lon2) / 180;
  
      // Haversine formula
      const dLat = lat2Rad - lat1Rad;
      const dLon = lon2Rad - lon1Rad;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const calculatedDistance = earthRadius * c; // Distance in kilometers
  
      // Set distance only if it's a number and round it to two decimal places
      if (!isNaN(calculatedDistance)) {
        setDistance(calculatedDistance.toFixed(2));
      }
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
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

          {/* Check if latitude and longitude are not null before creating the custom marker */}
          {latitude && longitude && (
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              title="Custom Location"
              onPress={() => {
                calculateDistance(location.latitude, location.longitude);
                setInfoView(!infoView)
              }}
            >
              <Callout>
                <Text>{hospitalName}</Text>
              </Callout>
            </Marker>
          )}
        </MapView>
      ) : (
        <ActivityIndicator size="large" />
      )}
      {infoView &&
              <TouchableOpacity>

      <View style={[tw`absolute bottom-3 py-6 w-[90%] flex flex-row justify-center items-center mx-5 rounded-xl`, {backgroundColor:'#007bff'}]}>
        <FontAwesome5 name="hospital-symbol" size={45} color="white" style={tw``}/>

      <View style={tw `ml-3`}>
        <Text style={tw`font-bold text-lg text-white`}>{hospitalName}</Text>
        <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-sm font-light text-white`}>{city}</Text>
        <Text style={tw`text-sm font-bold text-white`}>{distance} Km</Text>


        

        </View>
      </View>
        
      </View>
      </TouchableOpacity>

    }   
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
