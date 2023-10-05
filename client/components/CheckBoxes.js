import { Text, TextInput,TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function CheckBoxes () {

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
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

    return (
        <View style={styles.mainContainer}>
            {options.map((option) => (
                <TouchableOpacity
                key={option.id}
                style={[
                    styles.checkboxContainer,
                    selectedOptions.includes(option.id) && styles.checkboxSelected,
                ]}
                onPress={() => handleCheckboxChange(option.id)}
                >
                    <Text 
                        style={[
                            styles.checkboxLabel,
                            selectedOptions.includes(option.id) && styles.checkboxLabelSelected,
                        ]}
                    >{option.text}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    checkboxContainer: {
      padding: 22,
      paddingVertical: 10,
      margin: 2,
      borderRadius: 50,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'lightgray',
    },
    checkboxSelected: {
      backgroundColor: '#44afff',
    },
    checkboxLabel: {
        color: 'white',
    },
    checkboxLabelSelected: {
        fontWeight: 'bold',
    },
  });