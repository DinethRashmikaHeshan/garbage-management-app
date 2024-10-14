import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';// Make sure to initialize Supabase client
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [stats, setStats] = useState({ totalWeight: 0, totalBins: 0 });
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });

  useEffect(() => {
    fetchStats();
    fetchGraphData();
  }, []);

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('collections')
      .select('sum(weight) as totalWeight, count(id) as totalBins');
    if (!error) {
      setStats({
        totalWeight: data[0]?.totalWeight || 0,
        totalBins: data[0]?.totalBins || 0
      });
    }
  };

  const fetchGraphData = async () => {
    const { data, error } = await supabase
      .from('collections')
      .select('date, sum(weight) as weight')
      .group('date')
      .order('date', { ascending: true });

    if (!error) {
      const labels = data.map(item => item.date);
      const weights = data.map(item => item.weight);

      setGraphData({
        labels,
        datasets: [{ data: weights }]
      });
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text>Total Garbage Collected: {stats.totalWeight} kg</Text>
      <Text>Total Bins Collected: {stats.totalBins}</Text>
      <LineChart
        data={graphData}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="kg"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    </ScrollView>
  );
}
