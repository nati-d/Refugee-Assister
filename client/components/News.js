import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MultilingualText from './MultilingualText';

const newsApiKey = '05e33daaf0e545d083f04b8e32a76636';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllNews(); 
  }, []);

  const fetchAllNews = async () => {
    try {
      setLoading(true);
  
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=refugees immigration&apiKey=${newsApiKey}`
      );
  
      if (response.data.articles) {
        // Sort articles by publication date (newest first)
        const sortedNews = response.data.articles.sort((a, b) => {
          // Parse the publishedAt strings as dates and compare
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        });
  
        setNews(sortedNews);
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
        <Text style={styles.source}><MultilingualText text={item.source.name}/></Text>
        <Text style={styles.title}><MultilingualText text={item.title}/></Text>
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
    fontSize: 12,
    marginBottom: 4,
  },
  source: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default News;
