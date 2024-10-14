import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import * as Linking from 'expo-linking';

export default function PickupPointsScreen() {
  const [pickupPoints, setPickupPoints] = useState([]);

  useEffect(() => {
    fetchPickupPoints();
  }, []);

  const fetchPickupPoints = async () => {
    const { data, error } = await supabase
      .from('pickup_points')
      .select('*')
      .eq('status', 'pending');

    if (!error) {
      setPickupPoints(data);
    }
  };

  const handleNavigation = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text>Location: {item.address}</Text>
      <Text>Coordinates: {item.lat}, {item.lng}</Text>
      <TouchableOpacity onPress={() => handleNavigation(item.lat, item.lng)}>
        <Text style={{ color: 'blue' }}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={pickupPoints}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}
