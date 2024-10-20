// HistoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { fetchScanRecords } from '../services/HistoryService'; // Import the service layer function

const HistoryScreen = ({ collectorId }) => {
  const [scanRecords, setScanRecords] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  // Fetch scan records when the component mounts
  useEffect(() => {
    const loadScanRecords = async () => {
      try {
        const records = await fetchScanRecords(collectorId); // Fetching scan records from the service layer
        setScanRecords(records);
      } catch (err) {
        setError('Error fetching scan records: ' + err.message); // Set error message if fetching fails
        console.error('Error fetching scan records:', err);
      }
    };

    loadScanRecords();
  }, [collectorId]);

  // Render error message if there's an error
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text> {/* Updated to show the error message */}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {scanRecords.map((record, index) => (
        <View key={index} style={styles.recordContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.deviceIdText}>Device ID: {record.deviceId}</Text>
            <Text style={styles.detailsText}>Collection Details: {record.collectionDetails}</Text>
            <Text style={styles.capacityText}>Capacity Collected: {record.capacity} units</Text>
            <Text style={styles.dateText}>Date: {new Date(record.date).toLocaleString()}</Text>
          </View>
          <Image
            source={{ uri: record.qrCode }}  // Display the QR code image from Base64 string
            style={styles.qrImage}
          />
        </View>
      ))}
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e8f5e9', 
    paddingTop: 60,
  },
  recordContainer: {
    backgroundColor: '#66bb6a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
  },
  deviceIdText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  qrImage: {
    width: 100,
    height: 100,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  capacityText: {
    fontSize: 16,
    color: '#c8e6c9',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#f0f4c3',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default HistoryScreen;
