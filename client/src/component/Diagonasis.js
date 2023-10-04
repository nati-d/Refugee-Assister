import React from 'react'
import { TouchableOpacity } from 'react-native'
import {Appbar,Button} from 'react-native-paper'

const Diagonasis = () => {
    const backCatagories = () => {
        navigation.navigate('Catagories')
        const [text, setText] = React.useState('[text]');
    }
  return (<View  className="bg-whiteSmoke">
    <View className="bg-whiteSmoke justify-content-spacearound ">
   <Appbar.Header>
       <Appbar.Content className="text-align-centre font-bold" title="Diagnose" />
        <Appbar.Action icon="back-arrow" onPress={() => {backCatagories}} />
    </Appbar.Header>
    </View>
    <View className="flex-1">
    <TextInput
      label="prompt"
      value={text}
      onChangeText={text => setText(text)}
    />
        </View>
   <View className="display-flex flex-3">
   <Button rippleColor="#FF000020" icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
  <Button rippleColor="#FF000020" icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
  <Button rippleColor="#FF000020" icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
  <Button  icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
  <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
   </View>
   <View className="ml-10 mr-10 ">
<Text className="font-bold font-weight-15 ">Severity : </Text>
<View className="flex-3 gap-2">
    <Button className="bg-primary m-15 text-align-center ">1</Button>
    <Button className="bg-green m-15 text-align-center ">2</Button>
    <Button className="bg-red m-15 text-align-center ">3</Button>
    
</View>
   </View>
    
<View className="flex-1">
    <Button className="bg-primary m-15">
        <Text className="justify-content-center text-white">Start Diagonasing</Text></Button>
</View>







 </View>

 
  )
}

export default Diagonasis











