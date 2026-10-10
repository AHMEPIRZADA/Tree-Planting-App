"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "tree-planting-map-trees";

export default function useLocalStorage() {
  const [trees, setTrees] = useState([]);
  const [ready, setReady] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        const data = JSON.parse(saved);

        if (
          !Array.isArray(data) ||
          !data.every(
            (tree) =>
              tree &&
              typeof tree.userName === "string" &&
              typeof tree.treeName === "string" &&
              Number.isFinite(tree.lat) &&
              Number.isFinite(tree.lng) &&
              tree.lat >= -90 &&
              tree.lat <= 90 &&
              tree.lng >= -180 &&
              tree.lng <= 180 &&
              (typeof tree.id === "string" ||
                typeof tree.id === "number") &&
              typeof tree.date === "string" &&
              !Number.isNaN(Date.parse(tree.date))
          )
        ) {
          throw new Error("Invalid saved data");
        }

        setTrees(data);
      }

      setCanSave(true);
    } catch {
      setStorageError(
        "Saved data could not be loaded. New changes will only remain for this session."
      );
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready || !canSave) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(trees)
      );
      setStorageError("");
    } catch {
      setStorageError(
        "Trees could not be saved in this browser."
      );
    }
  }, [trees, ready, canSave]);

  return [trees, setTrees, ready, storageError];
}