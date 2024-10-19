import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';

export default function PickupPointsScreen() {
  const [pickupPoints, setPickupPoints] = useState([]);

  // Fetch the pickup points from the backend
  useEffect(() => {
    fetch('http://192.168.8.191:3000/api/pickup/pickup-points')  // Use your local IP address if testing on a physical device
      .then((response) => response.json())
      .then((data) => setPickupPoints(data))
      .catch((error) => console.error('Error fetching pickup points:', error));
  }, []);

  // Function to open Google Maps with the location
  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url).catch(err => console.error("Error opening Google Maps:", err));
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Pickup Points</Text>
      <FlatList
        data={pickupPoints}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>Location: Lat {item.location.lat}, Lng {item.location.lng}</Text>
            <TouchableOpacity onPress={() => openGoogleMaps(item.location.lat, item.location.lng)}>
              <Text style={{ color: 'blue' }}>Open in Google Maps</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
