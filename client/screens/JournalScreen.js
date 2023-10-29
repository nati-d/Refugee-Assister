import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function JournalScreen({ user }) {
  // Initialize current date and state for selected button and journals
  const currentDate = new Date();
  const dayNumbers = [];
  const [selectedButton, setSelectedButton] = useState('All');
  const [journals, setJournals] = useState([]);
  const navigation = useNavigation();

  // Handle button selection to filter journals
  const handleButtonSelection = (day) => {
    setSelectedButton(day);
  };
  
  for (let i = 0; i < 4; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    dayNumbers.push(date.getDate());
  }

  // Fetch user journals from the server
  const fetchUserJournals = async () => {
    try {
      const response = await fetch('https://assisterapp.onrender.com/journals/' + user.email);
      if (response.status === 200) {
        const data = await response.json();
        setJournals(data);
      } else {
        console.error('Failed to fetch user journals');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch user journals on initial load and set up a periodic refresh
  useEffect(() => {
    // Fetch data initially
    fetchUserJournals();

    // Set up an interval to fetch data every 1 second
    const intervalId = setInterval(() => {
      fetchUserJournals();
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Navigate to create a new journal entry
  const navigateToCreateJournal = () => {
    navigation.navigate('CreateJournal');
  };

  // Navigate to the journal entry detail view and provide actions for updating and deleting
  const navigateToJournalDetail = (journal) => {
    navigation.navigate('JournalDetail', {
      journal,
      onDelete: deleteJournal,
      onUpdate: updateJournal,
    });
  };

  // Delete a journal entry by its ID
  const deleteJournal = async (journalId) => {
    try {
      const response = await fetch('https://assisterapp.onrender.com/journals/' + journalId, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        fetchUserJournals();
      } else {
        console.error('Failed to delete the journal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Update a journal entry's content by its ID
  const updateJournal = async (journalId, updatedContent) => {
    try {
      const response = await fetch('https://assisterapp.onrender.com/journals/' + journalId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: updatedContent }),
      });
      if (response.status === 200) {
        fetchUserJournals();
      } else {
        console.error('Failed to update the journal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Filter the journals based on the selected button
  const filteredJournals = selectedButton === 'All'
    ? journals
    : journals.filter((journal) => {
        const journalDate = new Date(journal.date);
        return journalDate.getDate() === selectedButton;
      });

  return (
    <View style={[tw`flex w-full h-full py-3 `, { backgroundColor: '#007bff' }]}>
      <View style={tw`flex flex-row items-center justify-between mx-4`}>
        <Text style={tw`text-2xl font-extrabold text-white`}>Journal</Text>
        <TouchableOpacity onPress={navigateToCreateJournal}>
          <Feather name="plus-square" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex flex-row justify-between my-7 mx-4`}>
        <TouchableOpacity
          style={[
            tw`w-1/7 p-2 rounded-lg items-center`,
            styles.button,
            selectedButton === 'All' && styles.selectedButton,
          ]}
          onPress={() => handleButtonSelection('All')}
        >
          <Text style={tw`text-center text-white text-lg font-bold`}>All</Text>
        </TouchableOpacity>
        {dayNumbers.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              tw`w-1/7 p-2 rounded-lg items-center`,
              styles.button,
              selectedButton === day && styles.selectedButton,
            ]}
            onPress={() => handleButtonSelection(day)}
          >
            <Text style={tw`text-center text-white text-lg font-bold`}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw`bg-gray-300 w-full h-full rounded-t-3xl py-4 px-4`}>
        <Text style={tw`ml-3 font-semibold text-base text-gray-600`}>Your Journals</Text>
        <View style={tw`mt-4`}>
          {filteredJournals.length === 0 ? (
            <View style={tw`flex items-center`}>
              <Text style={tw`text-gray-700 text-lg`}>No journals found</Text>
            </View>
          ) : (
            filteredJournals.map((journal, index) => (
              <TouchableOpacity key={index} onPress={() => navigateToJournalDetail(journal)}>
                <View style={tw`flex flex-row mt-2 bg-orange-300 p-3 items-center rounded-t-md rounded-b-md`}>
                  <View style={tw`mr-3 flex items-center border-r pr-3 border-white`}>
                    <Text style={tw`font-bold text-lg text-gray-700`}>{new Date(journal.date).getDate()}</Text>
                    <Text style={tw`font-semibold text-sm text-gray-700`}>
                      {new Date(journal.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </View>
                  <View>
                    <Text style={tw`font-regular text-base text-gray-700`}>{journal.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
  },
  selectedButton: {
    backgroundColor: '#FFA500',
    borderColor: 'transparent',
  },
});
