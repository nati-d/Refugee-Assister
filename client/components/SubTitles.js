import { View, Text } from "react-native";
import tw from 'twrnc';
import MultilingualText from "./MultilingualText";

export default function SubTitle (props) {

    const [showAll, setShowAll] = useState(false);

    const handleSeeAllPress = () => {
        setShowAll(true);
      };

    return (
        <View style={tw `flex-row items-center justify-between`}>
            <Text style={tw `text-5 font-bold`}><MultilingualText text={props.title} /></Text>
            <Text style={tw `text-blue-400`}><MultilingualText text="SeeAll" /></Text>
      </View>
    )
}