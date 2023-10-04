import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationContainer from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import spalshscreen from './src/screens/Spalshscreen';
const Stack =  createNativeStackNavigator();
const App = ()=> {
  const [isFirstLaunched,setIsFirstLaunched]=React.useState(true);
  React.useEffect(
   async ()=>{
    const appData= await AsyncStroge.setItem('isFirstyLaunched','true');
    console.log(appData);
    if(appData==null){
      setIsFirstLaunched(true);
    }else{
      setIsFirstLaunched(false);
    }
   },[]
  );
  return(
    isFirstLaunched != null &&(
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name ="Spalshscreen" component={spalshscreen}/>
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
    )

  );
};
export default App;
