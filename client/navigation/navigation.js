// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import SplashScreen from '../screens/SplashScreen'
import OpeningScreen from '../screens/OpeningScreen';
import HomePage from '../screens/HomePage';
import ToolsPage from '../screens/ToolsPage';
import ProfilePage from '../screens/ProfilePage';

import { Ionicons } from '@expo/vector-icons';

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'md-home' : 'md-home-outline';
          } else if (route.name === 'Tools') {
            iconName = focused ? 'md-build' : 'md-build-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'md-person' : 'md-person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Tools" component={ToolsPage} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={ HomeTabNavigator } options={{ headerShown: false }} />
        
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        {/* <Stack.Screen name="Opening" component={OpeningScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;