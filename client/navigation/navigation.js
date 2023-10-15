import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OpeningScreen from '../screens/OpeningScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import useAuth from '../hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen';
import HomePage from '../screens/HomePage';
import ToolsPage from '../screens/ToolsPage';
import ProfilePage from '../screens/ProfilePage';
import DiagnosisResultScreen from '../screens/DiagnosisResultScreen';
import EmergencyContacts from '../screens/EmergencyContacts';

const Stack = createNativeStackNavigator();
//tab
const Tab = createBottomTabNavigator();

import { Ionicons } from '@expo/vector-icons';
import ChatbotScreen from '../screens/ChatbotScreen';
import DiagnosisScreen from '../screens/DiagnosisScreen';
import TranscribeScreen from '../screens/TranscribeScreen';
import MapScreen from '../screens/MapScreen';

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'md-home' : 'md-home-outline';
          } else if (route.name === 'ToolsTab') {
            iconName = focused ? 'md-build' : 'md-build-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'md-person' : 'md-person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#007BFF',
        inactiveTintColor: 'gray',
      }}
      tabBarStyle={{ display: 'flex' }}
    >
      <Tab.Screen name="HomeTab" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="ToolsTab" component={ToolsPage} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileTab" component={ProfilePage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function Navigation() {
  // const { user } = useAuth();
  // if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Home" component={HomeTabNavigator}  />
          <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
          <Stack.Screen name="Chatbot" component={ChatbotScreen}  />
          <Stack.Screen name="Diagnosis" component={DiagnosisScreen}  />
          <Stack.Screen name="DiagnosisResult" component={DiagnosisResultScreen}  />
          <Stack.Screen name="Transcribe" component={TranscribeScreen}  />
          <Stack.Screen name="Map" component={MapScreen}  />
          <Stack.Screen name="Emergency" component={EmergencyContacts}  />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  // } else {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator
  //         screenOptions={{
  //           headerShown: false
  //         }}>
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="Signup" component={SignupScreen} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }
}

export default Navigation;
