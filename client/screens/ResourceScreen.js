import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import resourcesData from '../data/resources.json';
import Background from '../components/Background';
import { MaterialIcons } from '@expo/vector-icons';

const ResourcesScreen = () => {
  const navigation = useNavigation();

  return (
    <Background>
    <View style={styles.container}>
        {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>
      <Text style={styles.title}>Resources and Articles</Text>
      <FlatList
        data={resourcesData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resourceCard}
            onPress={() => navigation.navigate('ResourceDetail', { resource: item })}
          >
            <Text style={styles.resourceTitle}>{item.title}</Text>
            <Text style={styles.resourceDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  resourceCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default ResourcesScreen;
