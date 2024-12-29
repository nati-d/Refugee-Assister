import React from 'react';
import { View, Text, StyleSheet, Button, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Background from '../components/Background';
import tw from 'twrnc';

const ResourcesDetailScreen = ({ route }) => {
  const { resource } = route.params;
  const navigation = useNavigation();

  const handleReadMore = () => {
    Linking.openURL(resource.link);
  };

  return (
    <Background>
    <View style={styles.container}>
        {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>
      <ScrollView>
      <View style={tw`bg-white p-5 w-full rounded-b-2xl`}>
      <Text style={styles.title}>{resource.title}</Text>
      <Text style={styles.details}>{resource.details}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Read More" onPress={handleReadMore} />
      </View></View></ScrollView>
    </View></Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  details: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ResourcesDetailScreen;
