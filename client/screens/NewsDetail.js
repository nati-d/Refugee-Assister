import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const NewsDetail = ({ route }) => {
  const { item } = route.params;

  // Function to open the URL when the "Read More" button is pressed
  const openURL = () => {
    if (item.url) {
      Linking.openURL(item.url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <Text style={styles.date}>{item.publishedAt}</Text>
      <Text style={styles.source}>{item.source.name}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={openURL} // Call the openURL function
      >
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop:20
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 4,
  },
  date: {
    fontSize: 12,
    marginTop: 8,
  },
  source: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 16,
  },
  readMoreButton: {
    backgroundColor: '#ccc',
    paddingVertical: 6, // Adjust the button's vertical padding
    paddingHorizontal: 12, // Adjust the button's horizontal padding
    borderRadius: 4,
    marginTop: 16,
  },
  readMoreText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default NewsDetail;
