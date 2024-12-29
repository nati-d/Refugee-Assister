import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../themes/ThemeProvider';
import tw from 'twrnc';

const ThemePicker = () => {
  const { setCustomBackgroundColor } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  // Gradient options for the background
  const gradients = [
    { label: 'white', colors: ['#FFFFFe', '#FFFFFF'] },
    { label: 'Sunrise', colors: ['#FF7E5F', '#FEB47B'] },
    { label: 'Ocean Blue', colors: ['#00C9FF', '#92FE9D'] },
    { label: 'Purple Dream', colors: ['#7F00FF', '#E100FF'] },
    { label: 'Cool Blues', colors: ['#2193B0', '#6DD5ED'] },
    { label: 'Forest Green', colors: ['#11998E', '#38EF7D'] },
    { label: 'Warm Glow', colors: ['#FF6A00', '#EE0979'] },
    { label: 'Berry Delight', colors: ['#DA4453', '#89216B'] },
    { label: 'Skyline', colors: ['#36D1DC', '#5B86E5'] },
    { label: 'Black', colors: ['#181818', '#0d0d0d'] },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[tw`rounded-full m-2 overflow-hidden`, { width: 50, height: 50 }]}
      onPress={() => {
        setCustomBackgroundColor(item.colors); // Save gradient colors
        setModalVisible(false); // Close modal after selection
      }}
    >
      <LinearGradient
        colors={item.colors}
        style={{ flex: 1, borderRadius: 25 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[tw`mr-5`]}>
      {/* Icon to open the color picker */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="color-palette" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal to show gradient options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}>
          <View style={tw`bg-white p-4 rounded-lg w-80`}>
            <Text style={tw`text-center font-bold text-lg mb-4`}>Select Background Gradient</Text>
            <FlatList
              data={gradients}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4} // Display items in a grid with 4 columns
              contentContainerStyle={tw`justify-center`}
            />
            <TouchableOpacity
              style={tw`mt-4 bg-gray-300 p-2 rounded`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`text-center`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ThemePicker;
