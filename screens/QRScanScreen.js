import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function QRScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedCode, setScannedCode] = useState(null);

  // Request camera permission on component mount
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Function to handle the QR code scan success
  const handleBarCodeScanned = ({ type, data }) => {
    setScannedCode(data);  // Set the scanned QR code value to state
    Alert.alert('Scan successful', `QR code scanned: ${data}`);
  };

  // Function to submit the scanned QR code to the backend
  const submitScan = async () => {
    try {
      const response = await axios.post('http://192.168.8.191:3000/api/scan/scan', {
        qrCode: scannedCode,  // Send the scanned QR code data to backend
      });

      // Show success message and navigate to PickupPoints screen
      Alert.alert('Success', 'Full capacity collected, device marked as inactive!');
      navigation.navigate('PickupPoints');  
    } catch (error) {
      // Handle error case
      Alert.alert('Error', 'Failed to process scan');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scannedCode ? undefined : handleBarCodeScanned}  // Disable scanner after a scan
        style={{ flex: 1 }}
      />
      {scannedCode && (
        <Button title="Submit Scan" onPress={submitScan} />  // Button to submit the scanned QR code
      )}
    </View>
  );
}
