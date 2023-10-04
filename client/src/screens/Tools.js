import React from 'react'
import { Card } from 'react-native-paper'
import Diagonasis from '../component/Diagonasis'
const Tools = () => {
  const backCatagories = () => {
    navigation.navigate('Catagories')}
  return (
    <View className={'bg-whiteSmoke '}>
      <View>
      <Appbar.Header>
       <Appbar.Content className="text-align-centre font-bold" title="Tools" />
        <Appbar.Action icon="back-arrow" onPress={() => {backCatagories}} />
    </Appbar.Header>
      </View>
      
   
    <View className={"w-70% flex flex-2"}>

    </View>
   <Card>
    <Diagonasis/>
   </Card>
   <Card>
    <Chatbot/>
   </Card>
   <Card>
    <Diagonasis/>
   </Card>
   <Card>
    <Diagonasis/>
   </Card>
   <Card>
    <Diagonasis/>
   </Card>
    </View>
  )
};

export default Tools




