// services/CollectorService.js
import axios from 'axios';
import { API_URL } from '../Constants';

export default class CollectorService {
  static async fetchDashboardData(collectorId) {
    try {
      const response = await axios.get(API_URL+`/api/collector/dashboard/${collectorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }
}
