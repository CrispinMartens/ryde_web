"use client";

import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { Ref } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface LiveMapTrackerHandle {
  updatePosition: (lat: number, lon: number) => void;
}

interface ControllerProps {
  initialLat: number;
  initialLon: number;
  controllerRef: Ref<LiveMapTrackerHandle>;
}

function MapController({ initialLat, initialLon, controllerRef }: ControllerProps) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    // Inject pulse animation once
    if (!document.getElementById("ryde-map-pulse")) {
      const style = document.createElement("style");
      style.id = "ryde-map-pulse";
      style.textContent = `
        @keyframes rydePulseRing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(3);  opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    const icon = L.divIcon({
      className: "",
      html: `
        <div style="position:relative;width:20px;height:20px;">
          <div style="position:absolute;inset:0;border-radius:50%;background:rgba(74,222,128,0.35);animation:rydePulseRing 2s ease-out infinite;"></div>
          <div style="position:absolute;top:4px;left:4px;width:12px;height:12px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px rgba(74,222,128,0.9);"></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    const marker = L.marker([initialLat, initialLon], { icon }).addTo(map);
    markerRef.current = marker;

    return () => {
      marker.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useImperativeHandle(controllerRef, () => ({
    updatePosition(lat: number, lon: number) {
      markerRef.current?.setLatLng([lat, lon]);
      map.panTo([lat, lon], { animate: true, duration: 0.8 });
    },
  }));

  return null;
}

interface Props {
  initialLat: number;
  initialLon: number;
}

const LiveMapTracker = forwardRef<LiveMapTrackerHandle, Props>(
  ({ initialLat, initialLon }, ref) => {
    return (
      <MapContainer
        center={[initialLat, initialLon]}
        zoom={13}
        zoomControl={false}
        attributionControl={false}
        style={{ width: "100%", height: "100%", background: "#0d1117" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        <MapController
          controllerRef={ref}
          initialLat={initialLat}
          initialLon={initialLon}
        />
      </MapContainer>
    );
  }
);
LiveMapTracker.displayName = "LiveMapTracker";

export default LiveMapTracker;
