// HistoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const HistoryScreen = () => {
  const [scanRecords, setScanRecords] = useState([]);
  const collectorId = "64b8c7457b56f9117cbdbb9b";

  // Fetch scan records when the component mounts
  useEffect(() => {
    const fetchScanRecords = async () => {
      try {
        // Replace 'collectorId' with the actual logged-in collector ID
        const response = await axios.get(`http://192.168.8.191:3000/api/records/history/${collectorId}`);
        setScanRecords(response.data);
      } catch (error) {
        console.error('Error fetching scan records:', error);
      }
    };

    fetchScanRecords();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {scanRecords.map((record, index) => (
        <View key={index} style={styles.recordContainer}>
          <Text style={styles.deviceIdText}>Device ID: {record.deviceId}</Text>
          <Image
            source={{ uri: record.qrCode }}  // Display the QR code image from Base64 string
            style={styles.qrImage}
          />
          <Text style={styles.detailsText}>Collection Details: {record.collectionDetails}</Text>
          <Text style={styles.capacityText}>Capacity Collected: {record.capacity} units</Text>
          <Text style={styles.dateText}>Date: {new Date(record.date).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  recordContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
  },
  deviceIdText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  qrImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  detailsText: {
    fontSize: 14,
  },
  capacityText: {
    fontSize: 14,
    color: 'green',
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default HistoryScreen;
