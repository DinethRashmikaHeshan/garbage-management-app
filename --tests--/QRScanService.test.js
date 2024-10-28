// __tests__/QRScanService.test.js
import QRScanService from '../services/QRScanService';
import axios from 'axios';

jest.mock('axios');

describe('QRScanService', () => {
  it('should submit scan successfully', async () => {
    const mockData = { message: 'Scan successful' };
    axios.post.mockResolvedValue({ data: mockData });

    const response = await QRScanService.submitScan('device123', 'collector123');
    expect(response).toEqual(mockData);
  });

  it('should throw error when API call fails', async () => {
    axios.post.mockRejectedValue(new Error('Failed to submit scan'));

    await expect(QRScanService.submitScan('device123', 'collector123')).rejects.toThrow('Failed to submit scan');
  });
});
