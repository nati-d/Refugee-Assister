import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';

export default function JournalDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { journal, onDelete, onUpdate } = route.params;
  const [isEditing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(journal.content);

  const handleUpdate = () => {
    onUpdate(journal._id, updatedContent); 
    setEditing(false);
  };

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
        <TouchableOpacity onPress={() => navigation.navigate('Journal')}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.headerButtons}>
          {isEditing ? (
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
              <MaterialIcons name="done" size={24} color="green" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
              <MaterialCommunityIcons name="pencil" size={24} color="gray" />
            </TouchableOpacity>
          )}
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
        <Text style={styles.dateText}>{formattedDateString}</Text>
        <Text style={styles.titleText}>{journal.title}</Text>

        {isEditing ? (
          <TextInput
            style={styles.contentInput}
            multiline
            value={updatedContent}
            onChangeText={setUpdatedContent}
          />
        ) : (
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
