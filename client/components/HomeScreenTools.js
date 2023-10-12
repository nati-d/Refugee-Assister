import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { StyleSheet } from "react-native";
import { colors } from '../themes/colors';
import MultilingualText from "./MultilingualText";

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
            <TouchableOpacity style={[tw `flex-row items-center justify-center w-41 p-2 h-16 rounded-3 mb-3`, {backgroundColor:colors.primary}]} onPress={()=> handlePress()}>                
                <Ionicons name={props.icon} size={props.iconSize} color='white' />
               <Text style={tw `text-center text-white font-bold ml-3`}><MultilingualText text={props.name} /></Text> 
            </TouchableOpacity>
        </View>
    )
}
