import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBoxes from '../components/CheckBoxes';
import SeverityButtons from '../components/SeverityButtons';
import axios from 'axios'; // Import Axios for making HTTP requests
import MultilingualText from '../components/MultilingualText';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function DiagnosisScreen() {
  const navigation = useNavigation();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userSymptom, setUserSymptom] = useState(''); // State to store user input
  const [inputSymptom, setInputSymptom] = useState(''); // State to track user's input

  const handleCheckboxChange = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const options = [
    { id: 'option1', text: 'Fever' },
    { id: 'option2', text: 'Cough' },
    { id: 'option3', text: 'Vomit' },
    { id: 'option4', text: 'Shortness of breath' },
    { id: 'option5', text: 'Fatigue' },
    { id: 'option6', text: 'Headache' },
    { id: 'option7', text: 'Nausea' },
    { id: 'option8', text: 'Sore throat' },
  ];

  const handleStartDiagnosing = async () => {
    // Log the text of selected symptoms
    const selectedSymptoms = options
      .filter((option) => selectedOptions.includes(option.id))
      .map((option) => option.text);
  
    console.log('Selected Symptoms:', selectedSymptoms);
  
    let response; // Declare the response variable outside of the try block
  
    try {
      // Send selected symptoms to the backend using Axios
      response = await axios.post('http://192.168.100.23:3000/symptomChecker', {
        symptoms: selectedSymptoms,
      });
  
      if (response.status === 200) {
        console.log('Backend Response:', response.data.response);
      } else {
        console.error('Error sending symptoms to the backend');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    // Check if response is defined before navigating
    if (response) {
      // Navigate to the DiagnosisResult screen
      navigation.navigate('DiagnosisResult', { diagnosisResult: response.data.response });
    }
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <View style={{ width: '90%' }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <TextInput
              placeholder='Write your symptoms'
              style={{ padding: 5, width: '75%', backgroundColor: 'white', borderRadius: 3 }}
              onChangeText={(text) => setInputSymptom(text)} // Update inputSymptom state
              value={inputSymptom} // Set value to inputSymptom
            />
           <TouchableOpacity onPress={() => setUserSymptom(inputSymptom)}>
            <View style={tw `flex-row`}>
              <Text><MultilingualText text="Add" /></Text>
              <Ionicons name="md-add" size={20} color="black" />
            </View>  
          </TouchableOpacity>
          </View>
          <CheckBoxes options={options} selectedOptions={selectedOptions} onCheckboxChange={handleCheckboxChange} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>
            <MultilingualText text="Severity" />
          </Text>
          <SeverityButtons />
        </View>
        <TouchableOpacity
          style={{ marginTop: 20, padding: 10, backgroundColor: '#007bff', borderRadius: 4 }}
          onPress={handleStartDiagnosing}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
            <MultilingualText text="StartDiagnosis" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
