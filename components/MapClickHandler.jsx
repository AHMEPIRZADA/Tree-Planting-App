"use client";

import { useMapEvents } from "react-leaflet";

export default function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      onMapClick({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
}