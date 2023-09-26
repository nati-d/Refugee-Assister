 import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import spalshscreen from './screens/splashscreen';
const Stack = createStackNvigatator();
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
        <Stack.Screen name ="splashscreen" component={spalshscreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
  
  );
};
export default App;





















// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

