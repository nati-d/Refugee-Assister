import tw from 'twrnc';
import { Text, TextInput,TouchableOpacity, View, Modal } from 'react-native';
import CheckBoxes from '../components/CheckBoxes';
import SeverityButtons from '../components/SeverityButtons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { colors } from '../themes/colors';

export default function DiagnosisScreen () {

    const [modalVisible, setModalVisible] = useState(false);

    return (
    <View style={[tw `flex-1 justify-center items-center`, { backgroundColor: '#f5f5f5' }]}>
        <View style={tw `w-90`}>
            <View style={tw ``}>
                <View style={tw `flex-row items-center justify-between`}>
                    <TextInput placeholder='Write your symptoms' style={tw `p-5 w-75 bg-white rounded-3`} />
                    <Ionicons name="add-circle" size={40} color={colors.primary} />
                </View>
                <CheckBoxes />
            </View>
            <View style={tw `mt-20`}>
                <Text style={tw `text-4 font-bold text-center text-gray-500`}>Rate the severity of your condition</Text>
                <SeverityButtons />
            </View>
            <TouchableOpacity 
                style={[ tw `mt-20 p-5 rounded-4`, { backgroundColor: '#007bff' }]}
            >
                <Text style={tw `text-center font-bold text-white text-4`}>Start Diagnosing</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
    
}