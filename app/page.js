"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import TreeForm from "../components/TreeForm";
import useLocalStorage from "../hooks/useLocalStorage";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <div className="map-loading">Loading map...</div>,
});

export default function Home() {
  const [trees, setTrees, ready, storageError] = useLocalStorage();

  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    treeName: "",
  });
  const [message, setMessage] = useState("");

  function handleMapClick(selectedLocation) {
    setLocation(selectedLocation);
    setMessage("");
  }

  function handleSaveTree() {
    const userName = formData.userName.trim();
    const treeName = formData.treeName.trim();

    if (!ready || !location || !userName || !treeName) return;

    const newTree = {
      id: crypto.randomUUID(),
      userName,
      treeName,
      lat: location.lat,
      lng: location.lng,
      date: new Date().toISOString(),
    };

    setTrees((previousTrees) => [...previousTrees, newTree]);
    setFormData({ userName: "", treeName: "" });
    setLocation(null);
    setMessage("Tree added! Click its marker to see the details.");
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <span className="eyebrow">A GREENER TOMORROW</span>
        <h1>🌳 Tree Planting Map</h1>
        <p>Select a location and record a tree planted there.</p>
      </header>

      {storageError && (
        <div className="notice warning" role="alert">
          {storageError}
        </div>
      )}

      <div className="main-grid">
        <section className="map-card" aria-label="Tree planting map">
          <div className="map-heading">
            <h2>Your planting map</h2>
            <span>Click to select a location</span>
          </div>

          <Map
            trees={trees}
            location={location}
            onMapClick={handleMapClick}
          />

          <p className="map-footer">
            🌳 Click a green tree marker to view its details.
          </p>
        </section>

        <aside className="sidebar">
          <TreeForm
            location={location}
            formData={formData}
            setFormData={setFormData}
            onSave={handleSaveTree}
            ready={ready}
          />

          {message && (
            <div className="notice success" role="status">
              {message}
            </div>
          )}

          <section className="stat-card">
            <h2>Total Trees</h2>
            <strong>{ready ? trees.length : "..."}</strong>
            <p>
              Trees are saved in this browser. Clearing site data
              removes your saved records.
            </p>
          </section>
        </aside>
      </div>

      <footer className="page-footer">
        Small steps. More trees. A greener future.
      </footer>
    </main>
  );
}