"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import MapClickHandler from "./MapClickHandler";

const treeIcon = L.divIcon({
  className: "tree-icon",
  html: '<span class="tree-marker" aria-hidden="true">🌳</span>',
  iconSize: [44, 44],
  iconAnchor: [22, 40],
  popupAnchor: [0, -36],
});

export default function Map({ trees, location, onMapClick }) {
  return (
    <MapContainer
      center={[24.8607, 67.0011]}
      zoom={12}
      scrollWheelZoom={true}
      className="planting-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onMapClick={onMapClick} />

      {location && (
        <CircleMarker
          center={[location.lat, location.lng]}
          radius={9}
          pathOptions={{
            color: "#2563eb",
            fillColor: "#60a5fa",
            fillOpacity: 0.7,
            weight: 3,
          }}
        />
      )}

      {trees.map((tree) => (
        <Marker
          key={tree.id}
          position={[tree.lat, tree.lng]}
          icon={treeIcon}
          bubblingMouseEvents={false}
        >
          <Popup>
            <div className="tree-popup">
              <h3>🌳 {tree.treeName}</h3>

              <p>
                <strong>Planted by:</strong> {tree.userName}
              </p>

              <p>
                <strong>Latitude:</strong> {tree.lat.toFixed(6)}
              </p>

              <p>
                <strong>Longitude:</strong> {tree.lng.toFixed(6)}
              </p>

              <p>
                <strong>Recorded on:</strong>{" "}
                {new Date(tree.date).toLocaleDateString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}