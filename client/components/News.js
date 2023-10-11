import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const newsApiKey = '';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {

    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
  
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`
        );
  
      if (response.data.articles) {
        const filteredNews = response.data.articles.filter(
          (item) =>
            item.status !== 'removed' &&
            item.urlToImage
        );
  
        setNews(filteredNews);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <View style={styles.newsContent}>
        <Text style={styles.date}>{item.publishedAt}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  return (

    <View style={styles.container}>
        {loading && (
        <View>
            <ActivityIndicator size="large" color="blue" />
        </View>
        )}
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 4,
  },
  newsContent: {
    flex: 1,
  },
  date: {
    fontSize: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default News;