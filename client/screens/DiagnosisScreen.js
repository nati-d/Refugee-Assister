import React, { useState, useEffect } from 'react';
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
import { useNavigation } from '@navigation/native';
import CheckBoxes from '../components/CheckBoxes';
import axios from 'axios';
import SeverityButtons from '../components/SeverityButtons';
import MultilingualText from '../components/MultilingualText';
import * as Location from 'expo-location';

export default function DiagnosisScreen({ route }) {
  const navigation = useNavigation();

  // State variables to manage user inputs and loading state
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputSymptom, setInputSymptom] = useState('');
  const [additionalInput, setAdditionalInput] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [severityLevel, setSeverityLevel] = useState(1);
  const [loading, setLoading] = useState(false);

  // Handle changes in the checkbox selection
  const handleCheckboxChange = (optionId) => {
    // Find the selected option based on its ID
    const selectedOption = options.find((option) => option.id === optionId);

    // Toggle the selection based on the current state
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

  // Use useEffect to fetch the user's location
  useEffect(() => {
    getLocation();
  }, []);

  // Function to get the user's location
  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Use MapQuest API to get city and country
      const { coords } = location;
      const apiKey = '7SGURFTVzIxPsq7y6DWWqMHLwayKD6b3';

      const response = await axios.get(
        `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${coords.latitude},${coords.longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
      );

      if (response.data.results && response.data.results[0].locations) {
        const address = response.data.results[0].locations[0];
        setCity(address.adminArea4);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  // Define the list of symptom options
  const options = [
    // List of symptom options with unique IDs
    { id: 'option1', text: 'Fever' },
    { id: 'option2', text: 'Cough' },
    // Add more symptom options here
  ];

  // Function to start the diagnosis process
  const handleStartDiagnosing = async () => {
    // Extract selected symptom texts based on option IDs
    const selectedSymptoms = options
      .filter((option) => selectedOptions.includes(option.id))
      .map((option) => option.text);

    // Check if a severity level is selected
    if (severityLevel === null) {
      console.error('Please select a severity level');
      return;
    }

    // Define severity labels
    const severityLabels = ['Mild', 'Medium', 'Severe'];
    const severityText = severityLabels[severityLevel - 1];

    // Create a diagnosis message with user data and symptoms
    const diagnosisMessage = `Currently, I am living in ${city} City, and these are my symptoms and personal data: Patient (Age: ${age}, Gender: ${gender}) presents with the following symptoms: ${selectedSymptoms.join(', ')}. Additional Information: ${additionalInput}. Severity: ${severityText}`;

    console.log('Diagnosis Message:', diagnosisMessage);

    // Set loading state while making the API request
    setLoading(true);

    try {
      // Send the diagnosis message to the backend
      const response = await axios.post('https://assisterapp.onrender.com/symptomChecker', {
        message: diagnosisMessage,
      });

      if (response.status === 200) {
        // Extract disease details from the response
        const { diseaseName, details, treatment, recommendation } = response.data;

        console.log('Backend Response:', response.data);

        // Navigate to the diagnosis result screen with the extracted data
        navigation.navigate('DiagnosisResult', {
          diseaseName,
          details,
          treatment,
          recommendation,
        });
      } else {
        console.error('Error sending symptoms to the backend');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {/* Input fields for symptoms and additional information */}
        <Text style={styles.header}><MultilingualText text='EnterYourSymptoms'/></Text>
        <CheckBoxes options={options} selectedOptions={selectedOptions} onCheckboxChange={handleCheckboxChange} />

        <Text style={styles.header}><MultilingualText text='AdditionalInformation'/></Text>
        <TextInput
          placeholder="Ex: Medical history, habits, current habitat..."
          style={styles.input}
          onChangeText={(text) => setAdditionalInput(text)}
          value={additionalInput}
          editable={!loading}
        />

        {/* Input fields for age and gender */}
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

        {/* Input field for selecting severity level */}
        <Text style={styles.header}><MultilingualText text='RateTheSeverityOfYourCondition'/></Text>
        <SeverityButtons onSelectSeverity={(level) => setSeverityLevel(level)} disabled={loading} />

        {/* Button to start the diagnosis process */}
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

// Styles for the DiagnosisScreen component
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
