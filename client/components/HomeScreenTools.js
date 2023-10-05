import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { StyleSheet } from "react-native";

export default function HomeScreenTool (props) {
    const handlePress = () => {
        props.navigation.navigate("Chatbot")
        props.navigation.navigate("Diagnosis")
    }
    return(
        <View>
            <TouchableOpacity style={tw `flex justify-center items-center bg-blue-300 w-16 h-16 rounded-full mb-2`}>                
                <Ionicons name={props.icon} size={props.iconSize} color="white" />
            </TouchableOpacity>
            <Text style={tw `text-center text-blue-400 font-bold`}>{props.name}</Text>
        </View>
        
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#007bff",
        width: 60,
        aspectRatio: 1,
        borderRadius: 50,
    }
})