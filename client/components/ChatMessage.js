import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

// ChatMessage component
const ChatMessage = ({ role, content }) => {
    const isUserMessage = role === 'user';
    const backgroundColor = isUserMessage ? '#007bff' : '#dddddd'; // Slightly darker gray for assistant
    const textColor = isUserMessage ? '#ffffff' : '#333333';
  
    // Define border radii for each corner
    const borderTopLeftRadius = isUserMessage ? 10 : 0;
    const borderTopRightRadius = isUserMessage ? 0 : 10;
    const borderBottomLeftRadius = 10;
    const borderBottomRightRadius = 10;
  
    const alignSelf = isUserMessage ? 'flex-end' : 'flex-start';
  
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
      </View>
    );
  };

  export default ChatMessage

  const styles = StyleSheet.create({
    
    messageContainer: {
      borderRadius: 10,
      padding: 10,
      marginVertical: 5,
      width: '80%',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });