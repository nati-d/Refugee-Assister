import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import MultilingualText from './MultilingualText';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const newsApiKey = '05e33daaf0e545d083f04b8e32a76636';

const News = () => {
  const [showAllNews, setShowAllNews] = React.useState(false);  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Initialize useNavigation

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
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => {
        navigation.navigate('NewsDetail', { item });
      }}
    >
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <View style={styles.newsContent}>
        <Text style={styles.date}>{item.publishedAt}</Text>
        <Text style={styles.source}>{item.source.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={tw `flex-row items-center justify-between`}>
        <Text style={tw `text-4 font-bold`}><MultilingualText text="RecentNews" /></Text>
        <TouchableOpacity onPress={() => setShowAllNews(!showAllNews)}>
          <Text style={tw`text-blue-400`}><MultilingualText text={showAllNews ? "ShowLess" : "SeeAll"} /></Text>
        </TouchableOpacity>
      </View>
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
    marginRight: 10,
    borderRadius: 4,
  },
  newsContent: {
    flex: 1,
  },
  date: {
    fontSize: 10,
    marginBottom: 2,
  },
  source: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#666666',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default News;
