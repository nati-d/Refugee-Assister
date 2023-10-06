import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { StyleSheet } from "react-native";
import { colors } from '../themes/colors';




export default function HomeScreenTool (props) {
    const navigation = useNavigation()
    const handlePress = () => {
        if (props.name === "Checker") {
            navigation.navigate("Diagnosis");
        } else if (props.name === "Assistant") {
            navigation.navigate("Chatbot");
        }
    }    
    return(
        <View>
            <TouchableOpacity style={[tw `flex justify-center items-center w-16 h-16 rounded-full mb-2`, {backgroundColor:colors.lightBlack}]} onPress={()=> handlePress()}>                
                <Ionicons name={props.icon} size={props.iconSize} color={colors.black} />
            </TouchableOpacity>
            <Text style={[tw `text-center font-bold`, {color:colors.black}]}>{props.name}</Text>
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