import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';
import { Spot } from '@/types';

declare const google: any;

const GOOGLE_MAPS_KEY = 'AIzaSyBmeki2tfqLQG4QEjBJTq1Tco63N4aLRqs';

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1d1d2b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1d1d2b' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8e8e9e' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a3e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1d1d2b' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#353550' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#151525' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#222238' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#1a2e1a' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#222238' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'simplified' }] },
];

// Colors matching SwiftUI
const ROUTE_COLOR = '#E87D55';   // terracotta
const STOP_COLOR = '#7AC4A5';    // sage
const GOLD_COLOR = '#E8C57A';    // softGold

interface GoogleMapViewProps {
  stops?: Spot[];
  checkedInStops?: Set<string>;
  currentStopIndex?: number;
  isInteractive?: boolean;
  className?: string;
  showRoute?: boolean;
}

function MapContent({ stops = [], checkedInStops = new Set(), currentStopIndex = 0, showRoute = false }: {
  stops: Spot[];
  checkedInStops: Set<string>;
  currentStopIndex: number;
  showRoute: boolean;
}) {
  const map = useMap();

  // Fit bounds to stops
  useEffect(() => {
    if (!map || stops.length === 0) return;
    const bounds = new google.maps.LatLngBounds();
    stops.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));
    map.fitBounds(bounds, 60);
  }, [map, stops]);

  // Draw route polyline
  useEffect(() => {
    if (!map || !showRoute || stops.length < 2) return;

    const path = stops.map(s => ({ lat: s.lat, lng: s.lng }));
    const polyline = new google.maps.Polyline({
      path,
      strokeColor: ROUTE_COLOR,
      strokeWeight: 4,
      strokeOpacity: 0.9,
      map,
    });

    // Walked overlay
    let walkedPolyline: any = null;
    if (checkedInStops.size > 0) {
      const walkedPath: any[] = [];
      for (const stop of stops) {
        walkedPath.push({ lat: stop.lat, lng: stop.lng });
        if (!checkedInStops.has(stop.id)) break;
      }
      if (walkedPath.length > 1) {
        walkedPolyline = new google.maps.Polyline({
          path: walkedPath,
          strokeColor: STOP_COLOR,
          strokeWeight: 6,
          strokeOpacity: 1,
          map,
        });
      }
    }

    return () => {
      polyline.setMap(null);
      walkedPolyline?.setMap(null);
    };
  }, [map, stops, checkedInStops, showRoute]);

  return null;
}

function StopMarkers({ stops, checkedInStops, currentStopIndex }: {
  stops: Spot[];
  checkedInStops: Set<string>;
  currentStopIndex: number;
}) {
  return (
    <>
      {stops.map((stop, i) => {
        const isCheckedIn = checkedInStops.has(stop.id);
        const isCurrent = i === currentStopIndex;
        const bgColor = isCheckedIn ? STOP_COLOR : isCurrent ? GOLD_COLOR : STOP_COLOR;

        return (
          <AdvancedMarker key={stop.id} position={{ lat: stop.lat, lng: stop.lng }} title={stop.name}>
            <Pin
              background={bgColor}
              borderColor={bgColor}
              glyphColor="#fff"
              scale={isCurrent ? 1.2 : 1}
            />
          </AdvancedMarker>
        );
      })}
    </>
  );
}

export default function GoogleMapComponent({
  stops = [],
  checkedInStops = new Set(),
  currentStopIndex = 0,
  isInteractive = true,
  className = '',
  showRoute = false,
}: GoogleMapViewProps) {
  const defaultCenter = stops.length > 0
    ? { lat: stops[0].lat, lng: stops[0].lng }
    : { lat: 37.7749, lng: -122.4194 };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_KEY}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={stops.length > 0 ? 14 : 12}
        gestureHandling={isInteractive ? 'auto' : 'none'}
        disableDefaultUI
        className={className}
        styles={DARK_MAP_STYLE}
        mapId="sidequest-dark"
      >
        <MapContent
          stops={stops}
          checkedInStops={checkedInStops}
          currentStopIndex={currentStopIndex}
          showRoute={showRoute}
        />
        <StopMarkers
          stops={stops}
          checkedInStops={checkedInStops}
          currentStopIndex={currentStopIndex}
        />
      </Map>
    </APIProvider>
  );
}

export { GOOGLE_MAPS_KEY };
