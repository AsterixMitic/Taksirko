type LatLon = {
  latitude: number;
  longitude: number;
};

export async function getLatLonFromAddress(address: string): Promise<LatLon> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'MyApp/1.0 (myemail@example.com)', // Replace with your app info
    },
  });

  if (!response.ok) {
    throw new Error(`Geocoding request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (data.length === 0) {
    throw new Error('No results found for the given address');
  }

  const { lat, lon } = data[0];

  return {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon),
  };
}
