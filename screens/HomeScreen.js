// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import CollectorService from '../services/CollectorService'; // Importing the service

export default function HomeScreen({ collectorId }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the dashboard data using the service
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await CollectorService.fetchDashboardData(collectorId);
        setDashboardData(data);
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [collectorId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!dashboardData) {
    return <Text>No data available.</Text>;
  }

  // Chart configurations (for bar/pie charts)
  const chartConfig = {
    backgroundGradientFrom: '#66bb6a',
    backgroundGradientTo: '#43a047',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  // Data for charts
  const binCollectionData = {
    labels: ['Daily', 'Weekly', 'Monthly'],
    datasets: [{ data: [dashboardData.daily.totalBins, dashboardData.weekly.totalBins, dashboardData.monthly.totalBins] }],
  };
  const capacityData = {
    labels: ['Daily', 'Weekly', 'Monthly'],
    datasets: [{ data: [dashboardData.daily.totalCapacity, dashboardData.weekly.totalCapacity, dashboardData.monthly.totalCapacity] }],
  };
  const pieData = [
    { name: 'Daily', population: dashboardData.daily.totalCapacity, color: 'rgba(102, 187, 106, 1)', legendFontColor: '#fff', legendFontSize: 15 },
    { name: 'Weekly', population: dashboardData.weekly.totalCapacity, color: 'rgba(76, 175, 80, 1)', legendFontColor: '#fff', legendFontSize: 15 },
    { name: 'Monthly', population: dashboardData.monthly.totalCapacity, color: 'rgba(56, 142, 60, 1)', legendFontColor: '#fff', legendFontSize: 15 },
  ];

  return (
    <LinearGradient colors={['#e8f5e9', '#66bb6a']} style={styles.gradient}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Total Weight Collected Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Icon name="scale-bathroom" size={40} color="#43a047" style={styles.icon} />
              <View>
                <Title style={styles.cardTitle}>Total Weight Collected</Title>
                <Text style={styles.cardText}>{dashboardData.totalCapacityCollected} kg</Text>
              </View>
            </View>
          </Card>

          {/* Total Bins Collected Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Icon name="delete-outline" size={40} color="#43a047" style={styles.icon} />
              <View>
                <Title style={styles.cardTitle}>Total Bins Collected</Title>
                <Text style={styles.cardText}>{dashboardData.totalBinsCollected}</Text>
              </View>
            </View>
          </Card>

          {/* Pie chart for capacity collected */}
          <Text style={styles.chartTitle}>Capacity Collected Breakdown</Text>
          <PieChart
            data={pieData}
            width={Dimensions.get('window').width - 30}
            height={220}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            style={styles.chart}
          />

          {/* Bar chart for bins collected */}
          <Text style={styles.chartTitle}>Bins Collected (Daily, Weekly, Monthly)</Text>
          <BarChart
            data={binCollectionData}
            width={Dimensions.get('window').width - 30}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            style={styles.chart}
          />

          {/* Bar chart for capacity collected */}
          <Text style={styles.chartTitle}>Capacity Collected (Daily, Weekly, Monthly)</Text>
          <BarChart
            data={capacityData}
            width={Dimensions.get('window').width - 30}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingTop: 60,
  },
  card: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  cardText: {
    fontSize: 18,
    color: '#757575',
  },
  icon: {
    marginRight: 20,
  },
  chartTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
});
