import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';

export default function JournalDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { journal, onDelete, onUpdate } = route.params;

  // State for handling editing mode and content updates
  const [isEditing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(journal.content);

  // Function to handle journal content update
  const handleUpdate = () => {
    onUpdate(journal._id, updatedContent); 
    setEditing(false);
  };

  // Format the date of the journal entry
  const formattedDate = new Date(journal.date);
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const formattedDateString = formattedDate.toLocaleDateString(undefined, dateOptions);

  return (
    <View style={[tw`flex w-full h-full py-3`, { backgroundColor: 'white' }]}>
      <View style={styles.headerContainer}>
        {/* Back button to navigate back to the journal */}
        <TouchableOpacity onPress={() => navigation.navigate('Journal')}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.headerButtons}>
          {isEditing ? (
            // Update button when in edit mode
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
              <MaterialIcons name="done" size={24} color="green" />
            </TouchableOpacity>
          ) : (
            // Edit button to enable editing mode
            <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
              <MaterialCommunityIcons name="pencil" size={24} color="gray" />
            </TouchableOpacity>
          )}
          {/* Delete button to remove the journal entry */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              onDelete(journal._id);
              navigation.navigate('Journal'); 
            }}
          >
            <Ionicons name="trash" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Display the formatted date and title of the journal entry */}
        <Text style={styles.dateText}>{formattedDateString}</Text>
        <Text style={styles.titleText}>{journal.title}</Text>

        {isEditing ? (
          // Text input for editing the content
          <TextInput
            style={styles.contentInput}
            multiline
            value={updatedContent}
            onChangeText={setUpdatedContent}
          />
        ) : (
          // Display the journal content or the edited content
          <Text style={styles.contentText}>{journal.content}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 20,
  },
  deleteButton: {
    marginRight: 20,
  },
  updateButton: {},
  contentContainer: {
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  contentInput: {
    height: '60%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  contentText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
});
