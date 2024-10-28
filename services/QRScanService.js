// services/QRScanService.js
import axios from 'axios';
import { API_URL } from '../Constants';

export default class QRScanService {
  static async submitScan(deviceId, collectorId) {
    try {
      const response = await axios.post(API_URL+'/api/scan/scan', {
        deviceId,
        collectorId,
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting scan:', error);
      throw new Error('Failed to submit scan');
    }
  }
}
