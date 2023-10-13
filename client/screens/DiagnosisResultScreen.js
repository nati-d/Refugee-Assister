import { View, Text } from "react-native";
import tw from 'twrnc';
import { colors } from "../themes/colors";

export default function DiagnosisResultScreen ({route}) {
    const { diagnosisResult } = route.params;

    return (
        <View style={[tw `flex items-center`, { backgroundColor: colors.background}]}>
            <View style={tw `w-90 mt-30`}>
                <Text style={tw `text-6 text-center mb-5`}>Here is your Diagnosis</Text>
                <View style={tw `mt-10`}>
                    <Text style={tw `text-5 ml-5`}>Result</Text>
                    <View style={tw `bg-white p-5 mt-2 border border-2 border-gray-300 rounded-5`}>
                        <Text>{diagnosisResult}</Text>
                    </View>
                </View>
                
            </View>
        </View>
    )
}