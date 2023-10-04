import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { StyleSheet } from "react-native";

export default function HomeScreenTool (props) {
    return(
        <View>
            <TouchableOpacity 
            // style={tw `flex justify-center items-center bg-blue-300 w-16 h-16 rounded-full mb-2`}
                style={styles.container}
            >                
                <Ionicons name={props.icon} size={34} color="white" />
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