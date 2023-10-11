import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const OpeningScreen = () => {
  return (
    <View style={[styles.container, tw`flex flex-1`]}>
        <Text>Name</Text>
      
    </View>
  )
}

export default OpeningScreen

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%,',
        backgroundColor:'#28c2ff',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'        
    }
})