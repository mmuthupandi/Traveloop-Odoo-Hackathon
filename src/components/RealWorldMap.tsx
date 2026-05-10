import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Location {
  name: string;
  lat: number;
  lng: number;
  isCurrentLocation?: boolean;
}

const travelLocations: Location[] = [
  { name: "New York, USA", lat: 40.7128, lng: -74.006 },
  { name: "Paris, France", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
  { name: "Current Location", lat: 28.6139, lng: 77.209, isCurrentLocation: true }, // Delhi
];

export function RealWorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
      minZoom: 2,
      maxZoom: 10,
    });

    mapInstanceRef.current = map;

    // Add tile layer (map style)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    // Custom icon for destination pins
    const destinationIcon = L.divIcon({
      className: "custom-pin",
      html: `
        <div style="position: relative;">
          <svg width="32" height="40" viewBox="0 0 32 40" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <path d="M16 0C9.373 0 4 5.373 4 12c0 8 12 24 12 24s12-16 12-24c0-6.627-5.373-12-12-12z" fill="#2F4F3E"/>
            <circle cx="16" cy="12" r="5" fill="white"/>
          </svg>
        </div>
      `,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
    });

    // Custom icon for current location
    const currentLocationIcon = L.divIcon({
      className: "custom-current-location",
      html: `
        <div style="
          width: 36px;
          height: 36px;
          background: #E7DDCE;
          border: 3px solid #2F4F3E;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F4F3E" stroke-width="3">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
    });

    // Add markers and collect coordinates for polyline
    const coordinates: L.LatLngExpression[] = [];
    
    travelLocations.forEach((location) => {
      const icon = location.isCurrentLocation ? currentLocationIcon : destinationIcon;
      const marker = L.marker([location.lat, location.lng], { icon }).addTo(map);
      
      marker.bindPopup(`
        <div style="font-family: system-ui; padding: 4px;">
          <strong style="color: #2F4F3E; font-size: 14px;">${location.name}</strong>
        </div>
      `);

      if (!location.isCurrentLocation) {
        coordinates.push([location.lat, location.lng]);
      }
    });

    // Draw dashed polyline connecting destinations
    if (coordinates.length > 1) {
      L.polyline(coordinates, {
        color: "#2F4F3E",
        weight: 2.5,
        opacity: 0.7,
        dashArray: "8, 12",
        lineCap: "round",
      }).addTo(map);
    }

    // Add airplane marker along the route
    if (coordinates.length > 1) {
      const midPoint = coordinates[Math.floor(coordinates.length / 2)];
      const airplaneIcon = L.divIcon({
        className: "custom-airplane",
        html: `
          <div style="
            background: white;
            border: 1px solid #E5DCC8;
            border-radius: 50%;
            padding: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F4F3E" stroke-width="2" style="transform: rotate(45deg);">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
            </svg>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      L.marker(midPoint, { icon: airplaneIcon }).addTo(map);
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-[280px] w-full rounded-[1.75rem] border border-[#E5DCC8] overflow-hidden"
      style={{ background: "#F5F0E7" }}
    />
  );
}
