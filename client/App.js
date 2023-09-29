import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SplashScreen from './screens/SplashScreen'
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import SignUp1 from './screens/SignUp1';
import SignUp2 from './screens/SignUp2';

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        title: null,
        headerShown: false
      },
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: null,
        headerShown: false
      },
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: null,
        headerShown: false
      },
    },
    SignUp1: {
      screen: SignUp1,
      navigationOptions: {
        title: null,
        headerShown: false
      },
    },
    SignUp2: {
      screen: SignUp2,
      navigationOptions: {
        title: null,
        headerShown: false,  
      },
    },
  },
  {
    initialRouteName: 'SplashScreen',
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
         <AppContainer />
    );
};

export default App;