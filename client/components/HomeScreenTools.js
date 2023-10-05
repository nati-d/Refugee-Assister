import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';

export default function HomeScreenTool (props) {
    const handlePress = () => {
        props.navigation.navigate("Chatbot")
    }
    return(
        <View>
            <TouchableOpacity style={tw `flex justify-center items-center bg-blue-300 w-16 h-16 rounded-full mb-2`} onPress={() => handlePress()}>
                <Ionicons name={props.icon} size={props.iconSize} color="white" />
            </TouchableOpacity>
            <Text style={tw `text-center text-blue-900`}>{props.name}</Text>
        </View>
        
    )
    
}