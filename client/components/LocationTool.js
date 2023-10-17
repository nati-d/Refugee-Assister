import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { colors } from '../themes/colors';


export default function LocationTool () {
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // Use MapQuest API to get city and country
        const { coords } = location;
        const apiKey = '7SGURFTVzIxPsq7y6DWWqMHLwayKD6b3';

        const response = await axios.get(
        `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${coords.latitude},${coords.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
        );

        if (response.data.results && response.data.results[0].locations) {
        const address = response.data.results[0].locations[0];
        setCity(address.adminArea4);
        setCountry(address.adminArea1);
        }
    } catch (error) {
        console.error('Error getting location:', error);
    }
    }

    return (
        <View style={tw `flex-row mt-6 items-center`}>
            <Ionicons name="md-pin" size={26} color={colors.primary} />
            <View>
            {city && country ? (
                <View>
                <Text style={tw `text-3 font-bold`}>
                    {city}, {country}
                </Text>
                </View>
            ) : (
                <Text style={tw `text-3 font-bold`}>Fetching location...</Text>
            )}
            </View>
        </View>
    )
}



