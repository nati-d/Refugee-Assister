import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { StyleSheet } from "react-native";
import { colors } from '../themes/colors';
import { LinearGradient } from 'expo-linear-gradient';
import MultilingualText from "./MultilingualText";



export default function HomeScreenTool (props) {
    const navigation=useNavigation()
    const handlePress = () => {
        if (props.name === "Diagnose") {
            navigation.navigate("Diagnosis");
        } else if (props.name === "Assistant") {
            navigation.navigate("Chatbot");
        }else if (props.name === "Map"){
            navigation.navigate("Map")
        }
    }    
    return(
        <View>
            <LinearGradient
                colors={[colors.primary, '#000000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ borderRadius: 50, padding: 10, width: 154, marginBottom: 20}}
            >
                <TouchableOpacity style={[tw `flex-row items-center pl-2`]} onPress={()=> handlePress()}>                
                    <Ionicons name={props.icon} size={props.iconSize} color='white' />
                    <Text style={tw `text-center text-white font-bold ml-3`}><MultilingualText text={props.name} /></Text>
                </TouchableOpacity>
            </LinearGradient>
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