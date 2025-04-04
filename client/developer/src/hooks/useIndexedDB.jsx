import { useEffect } from "react";
import { useState } from "react";
const useIndexedDB = (collection) => {
    const [db, setDb] = useState(null);
  useEffect(() => {
    if (!window.indexedDB) {
      console.error("IndexedDB is not supported in this browser.");
      return;
    }

    const request = indexedDB.open("MyDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(collection)) {
        db.createObjectStore(collection, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      console.log("IndexedDB initialized successfully.");
      setDb(event.target.result); // Store the database instance in state
    };

    request.onerror = (event) => {
      console.error("IndexedDB failed to open:", event.target.error);
    };
  }, [collection]); // Runs once on mount

  return db;
};

export default useIndexedDB;
