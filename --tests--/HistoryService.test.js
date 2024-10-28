import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HistoryScreen from '../screens/HistoryScreen';
import { fetchScanRecords } from '../services/HistoryService'; // Mock the service layer

jest.mock('../services/HistoryService'); // Mock the API service

describe('HistoryScreen', () => {
    it('renders correctly when scan records are fetched successfully', async () => {
      const mockRecords = [
        { deviceId: '123', collectionDetails: 'Collected 10 units', capacity: 10, date: new Date().toISOString(), qrCode: 'http://example.com/qr1' },
        { deviceId: '456', collectionDetails: 'Collected 5 units', capacity: 5, date: new Date().toISOString(), qrCode: 'http://example.com/qr2' },
      ];
      
      fetchScanRecords.mockResolvedValue(mockRecords); // Mock the resolved value of fetchScanRecords
  
      render(<HistoryScreen collectorId="test-collector-id" />);
  
      // Check if the records are rendered
      expect(await screen.findByText('Device ID: 123')).toBeTruthy();
      expect(await screen.findByText(/Collected 10 units/i)).toBeTruthy();
      expect(await screen.findByText(/Device ID: 456/i)).toBeTruthy();
      expect(await screen.findByText(/Collected 5 units/i)).toBeTruthy();
    });
  
    it('displays an error message when fetching records fails', async () => {
      fetchScanRecords.mockRejectedValue(new Error('Network error')); // Mock a rejection
  
      render(<HistoryScreen collectorId="test-collector-id" />);
  
      // Check for the error message
      expect(await screen.findByText('Error fetching scan records: Network error')).toBeTruthy(); // Updated to match error message format
    });
  });