import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import all screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import QRScanScreen from './screens/QRScanScreen';
import HistoryScreen from './screens/HistoryScreen';
import PickupPointsScreen from './screens/PickupPointsScreen';
import SignupScreen from './screens/SignupScreen';

// Create a bottom tab navigator for post-login screens
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Home, QRScan, History, PickupPoints
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="QRScan" component={QRScanScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="PickupPoints" component={PickupPointsScreen} />
    </Tab.Navigator>
  );
}

// Create a stack navigator for Login and Tabs
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        {/* LoginScreen as the initial screen */}
        <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        
        {/* Once logged in, navigate to the MainTabs (bottom tab navigator) */}
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
