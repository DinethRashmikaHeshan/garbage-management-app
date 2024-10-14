import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import QRScanScreen from './screens/QRScanScreen';
import HistoryScreen from './screens/HistoryScreen';
import PickupPointsScreen from './screens/PickupPointsScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="QR Scan" component={QRScanScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Pickup Points" component={PickupPointsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
