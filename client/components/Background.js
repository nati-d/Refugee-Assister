import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../themes/ThemeProvider';

const Background = ({ children }) => {
  const { customBackgroundColor } = useTheme();

  return (
    <LinearGradient
      colors={customBackgroundColor || ['#FFFFFF', '#FFFFFF']} // Default to white
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default Background;
