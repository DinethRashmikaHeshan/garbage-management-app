// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const collectorId = "670d6bc26976d9dc2063ea0b";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`http://192.168.8.191:3000/api/collector/dashboard/${collectorId}`);
        setDashboardData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total Weight Collected: {dashboardData.totalWeight} kg</Text>
      <Text style={styles.text}>Total Bins Collected: {dashboardData.totalBins}</Text>
      {/* Display graph or additional stats */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
