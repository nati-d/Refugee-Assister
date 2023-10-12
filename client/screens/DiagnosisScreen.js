import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBoxes from '../components/CheckBoxes';
import axios from 'axios';
import SeverityButtons from '../components/SeverityButtons';

export default function DiagnosisScreen() {
  const navigation = useNavigation();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userSymptom, setUserSymptom] = useState('');
  const [inputSymptom, setInputSymptom] = useState('');
  const [severityLevel, setSeverityLevel] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

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
    const selectedSymptoms = options
      .filter((option) => selectedOptions.includes(option.id))
      .map((option) => option.text);

    if (severityLevel === null) {
      console.error('Please select a severity level');
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post('http://192.168.1.8:3000/symptomChecker', {
        symptoms: selectedSymptoms,
        severity: severityLevel,
      });

      if (response.status === 200) {
        console.log('Backend Response:', response.data.response);
        navigation.navigate('DiagnosisResult', { diagnosisResult: response.data.response });
      } else {
        console.error('Error sending symptoms to the backend');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Set loading state to false when done
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' , paddingHorizontal: 4}}>
      <View style={{ width: '90%' }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <TextInput
              placeholder='Write your symptoms'
              style={[styles.input, { opacity: loading ? 0.5 : 1 }]} // Disable input during loading
              onChangeText={(text) => setInputSymptom(text)}
              value={inputSymptom}
              editable={!loading} // Disable input during loading
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
          <SeverityButtons onSelectSeverity={(level) => setSeverityLevel(level)} disabled={loading} />
        </View>
        <TouchableOpacity
          style={[styles.button, { opacity: loading ? 0.5 : 1 }]} // Disable button during loading
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

const styles = StyleSheet.create({
  input: {
    padding: 5,
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
