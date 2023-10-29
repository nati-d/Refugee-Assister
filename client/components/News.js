import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
import MultilingualText from './MultilingualText';
import { useNavigation } from '@react-navigation/native';

const newsApiKey = '05e33daaf0e545d083f04b8e32a76636';

/**
 * News component that displays recent news articles.
 */
const News = () => {
  const [showAllNews, setShowAllNews] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Load news from cache on component mount
    loadNewsFromCache();

    // Fetch news from API
    fetchAllNews();
  }, []);

  const cacheKey = '@NewsComponent:NewsData';

  /**
   * Load news data from AsyncStorage cache.
   */
  const loadNewsFromCache = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setNews(parsedData);
      }
    } catch (error) {
      console.error('Error loading news from cache:', error);
    }
  };

  /**
   * Save news data to AsyncStorage cache.
   * @param {Array} data - The news data to be cached.
   */
  const saveNewsToCache = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(cacheKey, jsonValue);
    } catch (error) {
      console.error('Error saving news to cache:', error);
    }
  };

  /**
   * Shuffle the order of news articles in an array.
   * @param {Array} array - The array of news articles to shuffle.
   * @returns {Array} - The shuffled array.
   */
  function shuffleNews(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Fetch news articles from an API and update the state.
   */
  const fetchAllNews = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=refugees immigration&apiKey=${newsApiKey}`
      );

      if (response.data.articles) {
        const sortedAndFilteredNews = response.data.articles
          .filter(
            (item) =>
              item.status !== 'removed' &&
              item.urlToImage
          )
          .sort((a, b) => {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });

        setNews(shuffleNews(sortedAndFilteredNews));
        saveNewsToCache(sortedAndFilteredNews); // Save news data to cache
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  /**
   * Render a news article item.
   * @param {Object} item - The news article object to render.
   * @param {number} index - The index of the news article in the list.
   */
  const renderNewsItem = ({ item, index }) => {
    if (!showAllNews && index > 8) {
      return null;
    }

    return (
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
          <Text numberOfLines={3} style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
