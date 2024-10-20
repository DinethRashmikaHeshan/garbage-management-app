import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon library
import { fetchPickupPoints,getAreaName } from '../services/PickupPointsService'; // Service Layer

export default function PickupPointsScreen({ collectorId }) {
  const [pickupPoints, setPickupPoints] = useState([]);
  const [error, setError] = useState(null);

  // Fetch pickup points from the service
  useEffect(() => {
    const loadPickupPoints = async () => {
      try {
        const data = await fetchPickupPoints();
        // Fetch area names for each pickup point
        const updatedData = await Promise.all(data.map(async (item) => {
          const areaName = await getAreaName(item.location.lat, item.location.lng);
          return { ...item, areaName }; // Add area name to each item
        }));
        setPickupPoints(updatedData);
      } catch (err) {
        setError(err.message);
      }
    };

    loadPickupPoints();
  }, []);

  // Function to open Google Maps with the location
  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url).catch(err => console.error("Error opening Google Maps:", err));
  };

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={pickupPoints}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.locationText}>
                  <Ionicons name="location-outline" size={18} color="#fff" />
                  {' '}{item.areaName} {/* Displaying the area name */}
                </Text>
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => openGoogleMaps(item.location.lat, item.location.lng)}
                >
                  <Ionicons name="map-outline" size={20} color="#fff" />
                  <Text style={styles.mapButtonText}>Open in Google Maps</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8f5e9',
    paddingTop: 60,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#66bb6a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  locationText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  mapButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
});
