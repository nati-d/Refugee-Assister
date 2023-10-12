import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { StyleSheet } from "react-native";
import { colors } from '../themes/colors';




export default function HomeScreenTool (props) {
    const navigation=useNavigation()
    const handlePress = () => {
        if (props.name === "Checker") {
            navigation.navigate("Diagnosis");
        } else if (props.name === "Assistant") {
            navigation.navigate("Chatbot");
        }else if (props.name === "Map"){
            navigation.navigate("Map")
        }
    }    
    return(
        <View>
            <TouchableOpacity style={[tw `flex-row items-center justify-center w-40 p-5 h-16 rounded-3 mb-3`, {backgroundColor:colors.primary}]} onPress={()=> handlePress()}>                
                <Ionicons name={props.icon} size={props.iconSize} color='white' />
                <Text style={tw `text-center text-white font-bold ml-3`}>{props.name}</Text>
            </TouchableOpacity>
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