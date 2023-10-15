import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import CheckBoxes from '../components/CheckBoxes';
import axios from 'axios';
import SeverityButtons from '../components/SeverityButtons';
import MultilingualText from '../components/MultilingualText';

export default function DiagnosisScreen() {
  const navigation = useNavigation();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputSymptom, setInputSymptom] = useState('');
  const [additionalInput, setAdditionalInput] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [severityLevel, setSeverityLevel] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (optionId) => {
    const selectedOption = options.find((option) => option.id === optionId);

    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== optionId));
      setInputSymptom(
        inputSymptom.replace(`, ${selectedOption.text}`, '').replace(/^,/, '')
      );
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
      setInputSymptom(
        inputSymptom ? `${inputSymptom}, ${selectedOption.text}` : selectedOption.text
      );
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
    { id: 'option9', text: 'Chills' },
    { id: 'option10', text: 'Muscle pain' },
    { id: 'option11', text: 'Loss of taste or smell' },
    { id: 'option12', text: 'Diarrhea' },
    { id: 'option13', text: 'Abdominal pain' },
    { id: 'option14', text: 'Rash' },
    { id: 'option15', text: 'Joint pain' },
    { id: 'option16', text: 'Dizziness' },
    { id: 'option17', text: 'Weakness' },
    { id: 'option18', text: 'Chest pain' },
    { id: 'option19', text: 'Sweating' },
    { id: 'option20', text: 'Runny nose' },
    // Add more options here
  ];

  const handleStartDiagnosing = async () => {
    const selectedSymptoms = options
      .filter((option) => selectedOptions.includes(option.id))
      .map((option) => option.text);
  
    if (severityLevel === null) {
      console.error('Please select a severity level');
      return;
    }
  
    const severityLabels = ['Mild', 'Medium', 'Severe'];
    const severityText = severityLabels[severityLevel - 1];
  
    const diagnosisMessage = `Patient (Age: ${age}, Gender: ${gender}) presents with the following symptoms: ${selectedSymptoms.join(', ')}. Additional Information: ${additionalInput}. Severity: ${severityText}`;
  
    console.log('Diagnosis Message:', diagnosisMessage);
  
    setLoading(true);
  
    try {
      const response = await axios.post('http://192.168.100.38:3000/symptomChecker', {
        message: diagnosisMessage,
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
      setLoading(false);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}><MultilingualText text='EnterYourSymptoms'/></Text>
        <CheckBoxes options={options} selectedOptions={selectedOptions} onCheckboxChange={handleCheckboxChange} />

        <Text style={styles.header}><MultilingualText text='AdditionalInformation'/></Text>
        <TextInput
          placeholder="Enter any additional information here"
          style={styles.input}
          onChangeText={(text) => setAdditionalInput(text)}
          value={additionalInput}
          editable={!loading}
        />

        <View style={styles.inlineInputs}>
          <View style={styles.inlineInput}>
            <Text style={styles.inputLabel}><MultilingualText text='Age'/></Text>
            <TextInput
              placeholder="Enter your age"
              style={styles.input}
              onChangeText={(text) => setAge(text)}
              value={age}
              editable={!loading}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inlineInput}>
            <Text style={styles.inputLabel}><MultilingualText text='Gender'/></Text>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>

        <Text style={styles.header}><MultilingualText text='RateTheSeverityOfYourCondition'/></Text>
        <SeverityButtons onSelectSeverity={(level) => setSeverityLevel(level)} disabled={loading} />
        <TouchableOpacity
          style={styles.button}
          onPress={handleStartDiagnosing}
          disabled={loading || selectedOptions.length === 0 || severityLevel === null}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.buttonText}><MultilingualText text='StartDiagnosis'/></Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,            // Add border width
    borderColor: '#ccc',       // Border color
    shadowColor: '#000',      // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,      // Shadow opacity
    shadowRadius: 3.84,
    elevation: 5,             // Elevation for Android shadow
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inlineInput: {
    flex: 1,
  },
  picker: {
    height: 50,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
