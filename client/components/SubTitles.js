import { View, Text } from "react-native";
import tw from 'twrnc';

export default function SubTitle (props) {
    return (
        <View style={tw `flex-row items-center justify-between`}>
            <Text style={tw `text-5 font-bold`}>{props.title}</Text>
            <Text style={tw `text-blue-400`}>See all</Text>
      </View>
    )
}