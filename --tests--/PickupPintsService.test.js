import { fetchPickupPoints } from '../services/PickupPointsService';

describe('Pickup Points Service', () => {
  it('should fetch pickup points successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ _id: '1', location: { lat: '12.34', lng: '56.78' } }]),
      })
    );

    const data = await fetchPickupPoints();
    expect(data).toEqual([{ _id: '1', location: { lat: '12.34', lng: '56.78' } }]);
    expect(global.fetch).toHaveBeenCalledWith('http://192.168.101.120:3000/api/pickup/pickup-points');
  });

  it('should throw an error when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch failed')));

    await expect(fetchPickupPoints()).rejects.toThrow('Fetch failed');
  });
});
