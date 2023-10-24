import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

// ChatMessage component
const ChatMessage = ({ role, content, timestamp }) => {
  const isUserMessage = role === 'user';
  const backgroundColor = isUserMessage ? '#007bff' : '#dddddd'; // Slightly darker gray for assistant
  const textColor = isUserMessage ? '#ffffff' : '#333333';

  // Define border radii for each corner
  const borderTopLeftRadius = isUserMessage ? 15 : 0;
  const borderTopRightRadius = isUserMessage ? 0 : 15;
  const borderBottomLeftRadius = 15;
  const borderBottomRightRadius = 15;
  const alignSelf = isUserMessage ? 'flex-end' : 'flex-start';
  const color = isUserMessage ? 'white' : '#777';

  // Format timestamp to display only the time (HH:mm)
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View
      style={[
        styles.messageContainer,
        {
          backgroundColor,
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
          alignSelf,
        },
      ]}
    >
      <Text style={{ color: textColor }}>{content}</Text>
      <Text style={[styles.timestampText, {color}]}>{time}</Text>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
  timestampText: {
    fontSize: 12, // Adjust the font size as needed // Define your desired color
    alignSelf: 'flex-end', // Align the timestamp to the right
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
