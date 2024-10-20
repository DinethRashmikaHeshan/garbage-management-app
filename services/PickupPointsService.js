import { API_URL,API_KEY } from '../Constants';
import axios from 'axios';

export const fetchPickupPoints = async () => {
  try {
    const response = await fetch(API_URL+'/api/pickup/pickup-points');
    if (!response.ok) {
      throw new Error('Failed to fetch pickup points');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in fetchPickupPoints:', error);
    throw error; // throw the error
  }
};

export const getAreaName = async (lat, lng) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          latlng: `${lat},${lng}`,
          key: API_KEY,
        },
      });
  
      if (response.data.results.length > 0) {
        return response.data.results[0].formatted_address; // Return the formatted address
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      throw new Error(`Geocoding error: ${error.message}`);
    }
  };
