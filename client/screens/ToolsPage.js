import { View, Text } from "react-native";
import tw from 'twrnc';
import HomeScreenTool from "../components/HomeScreenTools";

export default function ToolsPage () {
    return (
        <View style={tw `flex-1 justify-center items-center`}>
            <View style={tw `mt-10`}>
              <View>
                <View style={tw `flex-row justify-between gap-4`}>
                  <HomeScreenTool name="Diagnose" icon="md-medkit" iconSize={25} />
                  <HomeScreenTool name="Assistant" icon="md-chatbox" iconSize={25} />
                </View>
                <View style={tw `flex-row justify-between gap-4`}>
                  <HomeScreenTool name="Journal" icon="md-trending-up" iconSize={25} />
                </View>
              </View>
            </View>
        </View>
    )
}