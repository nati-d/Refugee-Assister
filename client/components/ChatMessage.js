import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

// ChatMessage component for rendering chat messages
const ChatMessage = ({ role, content, timestamp }) => {
  // Determine if the message is from the user or the assistant
  const isUserMessage = role === 'user';

  // Define background color for the message bubble
  const backgroundColor = isUserMessage ? '#007bff' : '#dddddd'; // Slightly darker gray for assistant
  const textColor = isUserMessage ? '#ffffff' : '#333333'; // Text color

  // Define border radii for each corner of the message bubble
  const borderTopLeftRadius = isUserMessage ? 15 : 0;
  const borderTopRightRadius = isUserMessage ? 0 : 15;
  const borderBottomLeftRadius = 15;
  const borderBottomRightRadius = 15;

  // Align the message bubble to the right for user messages and to the left for assistant messages
  const alignSelf = isUserMessage ? 'flex-end' : 'flex-start';

  // Set the timestamp text color
  const color = isUserMessage ? 'white' : '#777';

  // Format the timestamp to display only the time (HH:mm)
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
      <Text style={[styles.timestampText, { color }]}>{time}</Text>
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
    fontSize: 12, // Adjust the font size as needed
    alignSelf: 'flex-end', // Align the timestamp to the right for user messages
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
