// QRScanScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRScanService from '../services/QRScanService'; // Import service
import { useNavigation } from '@react-navigation/native';

export default function QRScanScreen({ collectorId }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  // Request camera permission on component mount
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestPermissions();
  }, []);

  // Handle QR code scanning
  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return; // Prevent multiple scans
    setScanned(true);

    // Extract deviceId from QR code
    const deviceId = data.split('/').pop();
    console.log('Scanned QR Code:', deviceId);
    Alert.alert('Scan successful', `QR code scanned: ${deviceId}`);

    // Submit scan data to backend
    await submitScan(deviceId);
  };

  // Submit scan data to backend
  const submitScan = async (deviceId) => {
    try {
      const response = await QRScanService.submitScan(deviceId, collectorId);
      Alert.alert('Success', 'Full capacity collected, device marked as inactive!');
      navigation.navigate('PickupPoints');  
    } catch (error) {
      Alert.alert('Error', 'Failed to process scan');
    }
  };

  // Handle camera permission status
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the QR Scanner!</Text>
      <Text style={styles.paragraph}>Scan a QR code to start your job.</Text>

      {/* QR Code Scanner */}
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>

      {/* Reset Scan Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
        disabled={!scanned}
      >
        <Text style={styles.buttonText}>Reset Scanner</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for QRScanScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f5e9', // Light green background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: '#43a047', // Green background
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
