import { View, Text } from "react-native";
import tw from 'twrnc';
import { colors } from "../themes/colors";

export default function DiagnosisResultScreen () {
    return (
        <View style={[tw `flex items-center`, { backgroundColor: colors.background}]}>
            <View style={tw `w-90 mt-30`}>
                <Text style={tw `text-6 text-center mb-5`}>Here is your Diagnosis</Text>
                <View style={tw `mt-10`}>
                    <Text style={tw `text-5 ml-5`}>Result</Text>
                    <View style={tw `bg-white p-5 mt-2 border border-2 border-gray-300 rounded-5`}>
                        <Text>I'm sorry to hear about your symptoms. It's essential to consider various possibilities, but based on the symptoms you've described, one potential disease that comes to mind is pneumonia. Pneumonia can cause cough, high fever, breathing difficulties, and fatigue. However, please note that this is just a preliminary assessment, and a proper diagnosis requires a thorough evaluation by a healthcare professional.</Text>
                    </View>
                </View>
                <View style={tw `mt-10`}>
                    <Text style={tw `text-5 ml-5`}>Treatment</Text>
                    <View style={tw `bg-white p-5 mt-2 border border-2 border-gray-300 rounded-5`}>
                        <Text>
                            Rest: Give your body time to recover by getting plenty of rest. {'\n'}
                            Stay Hydrated: Drink fluids to stay hydrated. {'\n'}
                            Over-the-Counter Medications: Over-the-counter cough suppressants or fever reducers may help alleviate symptoms temporarily. Follow the dosing instructions carefully. {'\n'}
                            Warm Compress: For chest discomfort, a warm compress on your chest may provide some relief.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}