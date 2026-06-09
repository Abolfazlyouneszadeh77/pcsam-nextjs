"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

type LatLng = [number, number];

const DEFAULT_POSITION: LatLng = [36.5659, 53.0586]; // ساری

export default function MapView() {
  const [position, setPosition] = useState<LatLng>(DEFAULT_POSITION);
  const [mapKey, setMapKey] = useState("initial");

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (geo) => {
        const newPos: LatLng = [
          geo.coords.latitude,
          geo.coords.longitude,
        ];

        setPosition(newPos);

        // 🔥 این مهمه — باعث ری‌مونت شدن کامل نقشه میشه
        setMapKey(`${newPos[0]}-${newPos[1]}`);
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="h-75 w-full rounded-2xl overflow-hidden">
      <MapContainer
        key={mapKey}
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>موقعیت مکانی شما</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
