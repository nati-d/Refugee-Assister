import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import tw from 'twrnc';
import axios from 'axios';
import { Linking } from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { colors } from "../themes/colors";
import MultilingualText from "../components/MultilingualText";

/**
 * FunFact component for displaying fun facts about a selected country.
 * @param {object} props - Component props, including the 'country'.
 */
export default function FunFact(props) {
  // Initial message to send for fun fact retrieval
  const defaultMessage = `The country ${props.country}.`;

  // State variables
  const [funFact, setFunFact] = useState([]); // Holds the retrieved fun fact
  const [loading, setLoading] = useState(false); // Indicates if data is loading
  const [buttonColor, setButtonColor] = useState('gray'); // Button color state

  // A demo fun fact message for testing purposes
  const demo = 'Fun fact about Ethiopia is that it is poor.';

  /**
   * Function to generate a fun fact by making an API request.
   */
  const generateFunFact = async () => {
    try {
      if (!defaultMessage) {
        return;
      }
      setLoading(true);

      // Send the message to the server for processing
      const response = await axios.post('https://assisterapp.onrender.com/funFact', {
        message: defaultMessage,
      });

      if (response?.data?.funFact) {
        const aiResponse = response.data.funFact;
        setFunFact(aiResponse);
      } else {
        console.log('Response data is missing or invalid');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error:', err.message);
      setLoading(false);
    }
  };

  const [isTextVisible, setIsTextVisible] = useState(false);

  /**
   * Handle the press event on the circular button.
   */
  const handleCirclePress = () => {
    if (isTextVisible === false) {
      generateFunFact();
      setIsTextVisible(true);
      setButtonColor(colors.primary);
    } else {
      setIsTextVisible(false);
      setButtonColor('gray');
    }
  };

  const styles = {
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 70,
      width: 200
    },
    circle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: buttonColor,
      marginLeft: 5
    },
    text: {
      fontSize: 11,
      padding: 4,
      backgroundColor: 'white',
      fontWeight: '600',
      borderRadius: 10,
    },
  };

  return (
    <View style={styles.container}>
      {isTextVisible && (
        loading ? (
          <View>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <Text numberOfLines={6} style={[styles.text, tw`-pb-16`]}>
            {funFact}
          </Text>
        )
      )}
      <TouchableOpacity
        style={styles.circle}
        onPress={handleCirclePress}
      >
        <AntDesign name="questioncircle" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
}
