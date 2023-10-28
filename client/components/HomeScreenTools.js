import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { StyleSheet } from "react-native";
import { colors } from '../themes/colors';
import { LinearGradient } from 'expo-linear-gradient';
import MultilingualText from "./MultilingualText";
import i18n from 'i18next';



export default function HomeScreenTool (props) {
    const navigation=useNavigation()
    const handlePress = () => {
        if (props.name === "Diagnose") {
            navigation.navigate("Diagnosis");
        } else if (props.name === "Assistant") {
            navigation.navigate("Chatbot");
        }else if (props.name === "Map"){
            navigation.navigate("Map")
        }else if (props.name === "Journal"){
            navigation.navigate("Journal")
        }
    }    
    return(
        <View>
          <LinearGradient
            colors={[colors.primary, '#FF6A6A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 50,
              marginBottom: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.5,
              shadowRadius: 6,
              elevation: 8,
              borderWidth: 1,
              borderColor: '#ccc',
            }}
          >
            <TouchableOpacity style={[tw `flex-row items-center h-15 w-40 pl-5`]} onPress={() => handlePress()}>                
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