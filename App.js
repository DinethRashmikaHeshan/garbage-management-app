import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; // Importing icon library

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
function MainTabs({ route }) {
  const { collectorId } = route.params; // Get collectorId from route params

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#D2E8C9' }, // Pale Lime background
        tabBarActiveTintColor: '#0B3D3E',// Darker green for active tab icon
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen collectorId={collectorId} />} // Pass collectorId to HomeScreen
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="QRScan"
        children={() => <QRScanScreen collectorId={collectorId} />} // Pass collectorId to QRScanScreen
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="qr-code-scanner" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="History"
        children={() => <HistoryScreen collectorId={collectorId} />} // Pass collectorId to HistoryScreen
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PickupPoints"
        children={() => <PickupPointsScreen collectorId={collectorId} />} // Pass collectorId to PickupPointsScreen
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="place" size={24} color={color} />,
          headerShown: false,
        }}
      />
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
