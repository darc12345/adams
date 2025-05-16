'use client';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

type PollutionPoint = {
  x_coor: number;
  y_coor: number;
  pollution: number;
};

export default function ReadOnlyMap({
  center,
  pollutionPoints = [],
}: {
  center: [number, number];
  pollutionPoints?: PollutionPoint[];
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAH6Ea8-iD481XUxKu4sBrUxY7L6BOicYI',
    libraries: ['visualization'],
  });

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
  };

  // Color marker based on pollution value
  const getMarkerColor = (pollution: number) => {
    if (pollution >= 100) return 'red';
    if (pollution >= 50) return 'yellow';
    return 'green';
  };

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '12px', minHeight: 120 }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: center[0], lng: center[1] }}
          zoom={13}
          options={{
            disableDefaultUI: true,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            keyboardShortcuts: false,
          }}
        >
          {/* Main center marker */}
          <MarkerF position={{ lat: center[0], lng: center[1] }} />

          {/* Pollution exposure points */}
          {pollutionPoints.map((point, idx) => (
            <MarkerF
              key={idx}
              position={{ lat: point.x_coor, lng: point.y_coor }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 6,
                fillColor: getMarkerColor(point.pollution),
                fillOpacity: 0.9,
                strokeWeight: 1,
                strokeColor: '#222',
              }}
              title={`Pollution: ${point.pollution}`}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}