'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleMap, useJsApiLoader, HeatmapLayerF } from '@react-google-maps/api';
import AuthGuard from '@/components/AuthGuard';

const mapContainerStyle = {
  width: '100%',
  height: '700px',
  borderRadius: '0.5rem',
};

// Define a type for heatmap data
type HeatmapPoint = {
  lat: number;
  lng: number;
  weight: number;
};

export default function AirQualityPage() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [heatmapData, setHeatmapData] = useState<HeatmapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load Google Maps JS API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAH6Ea8-iD481XUxKu4sBrUxY7L6BOicYI', // Replace with your actual API key
    libraries: ['visualization'],
  });

  useEffect(() => {
    // Fetch heatmap data from your backend
    const fetchHeatmapData = async () => {
      try {
        const response = await fetch('https://adam-be1-c555c3bbd0a6.herokuapp.com/get-heatmap', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch heatmap data');
        }

        const data: { pollution: number; coordinate: [number, number]; }[] = await response.json();
        // Adapt the structure: { pollution, coordinate: [lat, lng] }
        const formattedData: HeatmapPoint[] = data.map((item) => ({
          lat: item.coordinate[0],
          lng: item.coordinate[1],
          weight: item.pollution
        }));
        setHeatmapData(formattedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmapData();

    // Date/time updater
    const updateDateTime = () => {
      const now = new Date();
      const day = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Jakarta' });
      const dayNum = now.getDate();
      const daySuffix =
        dayNum % 10 === 1 && dayNum !== 11
          ? 'st'
          : dayNum % 10 === 2 && dayNum !== 12
          ? 'nd'
          : dayNum % 10 === 3 && dayNum !== 13
          ? 'rd'
          : 'th';
      const month = now.toLocaleDateString('en-US', { month: 'long', timeZone: 'Asia/Jakarta' });
      const year = now.getFullYear();
      setDate(`${day}, ${dayNum}${daySuffix} ${month} ${year}`);
      setTime(
        now
          .toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Jakarta',
          })
      );
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthGuard>
      <div className="p-4 bg-[#14181D] min-h-screen text-white flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div
            className="flex items-center cursor-pointer w-fit"
            onClick={() => router.push('/dashboard')}
          >
            <span className="text-2xl font-bold mr-2">&lt;</span>
            <h1 className="text-2xl font-bold">Air Quality Dashboard</h1>
          </div>
          <div className="flex justify-between items-start mt-4">
            <span className="font-bold text-3xl mr-4 flex items-center" style={{ minHeight: '64px' }}>
              Sleman
            </span>
            <div className="flex flex-col items-start flex-1 mt-3 text-[#8491A2]">
              <span className="text-sm">{date}</span>
              <span className="text-sm">{time}</span>
            </div>
          </div>
        </div>

        {/* Loading and error states */}
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <p>Loading heatmap data...</p>
          </div>
        )}
        {error && (
          <div className="flex-1 flex items-center justify-center text-red-500">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Google Maps Heatmap */}
        {!loading && !error && (
          <div className="rounded-lg flex-1 w-full flex items-center justify-center overflow-hidden p-0 m-0" style={{ minHeight: 0 }}>
            <div style={mapContainerStyle}>
              {isLoaded && heatmapData.length > 0 && (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: -7.7828, lng: 110.3671 }} // Default center for Sleman
                  zoom={12}
                  options={{
                    styles: [], 
                    disableDefaultUI: false,
                  }}
                >
                  <HeatmapLayerF
                    data={heatmapData.map(p => ({
                      location: new window.google.maps.LatLng(p.lat, p.lng),
                      weight: p.weight,
                    }))}
                    options={{
                      radius: 1,
                      opacity: 0.5,
                      gradient: [
                        'rgba(0, 255, 0, 0)',      // Green (good)
                        'rgba(255, 255, 0, 0.6)',   // Yellow (moderate)
                        'rgba(255, 0, 0, 0.8)'      // Red (poor)
                      ]
                    }}
                  />
                </GoogleMap>
              )}
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}