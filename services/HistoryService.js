import axios from 'axios';
import { API_URL } from '../Constants';
// Define a base URL for your API
const BASE_URL = API_URL+'/api/records/history/';

// Function to fetch scan records for a specific collector
export const fetchScanRecords = async (collectorId) => {
  try {
    const response = await axios.get(`${BASE_URL}${collectorId}`);
    return response.data;
  } catch (error) {
    throw new Error('Unable to fetch scan records. Please try again later.'); // Custom error handling
  }
};
