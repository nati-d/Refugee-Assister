import tw from 'twrnc';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function News () {
    return (
        <TouchableOpacity style={tw `flex-row items-center bg-gray-100 mt-3 rounded-3`}>
            <Image style={tw `w-20 h-20`} source={require('../assets/news.jpg')} resizeMode='cover' />
            <View style={tw `ml-3`}>
                <View style={tw `flex-row`}>
                    <Text>Date: </Text>
                    <Text>Feb 28, 2023</Text>
                </View>
                <View style={tw `flex-row`}>
                    <Text>Category: </Text>
                    <Text style={tw `font-bold`}>Politics</Text>
                </View>
                <View style={tw `flex-row`}>
                    <Text>Title: </Text>
                    <Text numberOfLines={2} style={tw `text-3 w-45`}>The US drops yet another atomic bomb on Japan</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}