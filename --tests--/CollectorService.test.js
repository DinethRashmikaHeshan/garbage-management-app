// __tests__/CollectorService.test.js
import CollectorService from '../services/CollectorService';
import axios from 'axios';

jest.mock('axios');

describe('CollectorService', () => {
  it('should fetch dashboard data successfully', async () => {
    const collectorId = 'collector-id';
    const mockData = { daily: { totalBins: 10 }, weekly: { totalBins: 20 }, monthly: { totalBins: 30 } };
    
    axios.get.mockResolvedValue({ data: mockData });

    const result = await CollectorService.fetchDashboardData(collectorId);
    expect(result).toEqual(mockData);
  });

  it('should throw error when API call fails', async () => {
    const collectorId = 'collector-id';
    
    axios.get.mockRejectedValue(new Error('Failed to fetch dashboard data'));

    await expect(CollectorService.fetchDashboardData(collectorId)).rejects.toThrow('Failed to fetch dashboard data');
  });
});
