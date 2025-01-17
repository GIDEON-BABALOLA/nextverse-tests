export const addStickyNote = (db, note, collection) => {
    const transaction = db.transaction(collection, "readwrite"); // Open a transaction
    const store = transaction.objectStore(collection); // Get the object store
  
    const newNote = {  ...note, timestamp: new Date() }; // Data to store
  
    const request = store.add(newNote); // Add the data
    request.onsuccess = () => console.log("Note added successfully!");
    request.onerror = (event) => console.error("Error adding note:", event.target.error);
  }
export const  getStickyNote = (db, id) => {
    const transaction = db.transaction("notes", "readonly");
    const store = transaction.objectStore("notes");
  
    const request = store.get(id); // Fetch the note by ID
  
    request.onsuccess = () => console.log("Note:", request.result);
    request.onerror = () => console.error("Failed to fetch note");
  }
  
  export const getAllStickyNotes = (db, collection, callback) => {
    if (!db) {
      console.error("Database not available yet.");
      callback([]); // Return an empty array if db is not ready
      return;
    }
      const transaction = db.transaction(collection, "readonly");
      const store = transaction.objectStore(collection);
      const request = store.getAll(); // Fetch all notes
  
      request.onsuccess = () => {
        callback(request.result); // Pass the result to the callback
      };
  
      request.onerror = (event) => {
        console.error("Failed to fetch notes:", event.target.error);
        callback([]); // Return empty array on error
      };
  };
  
  
  
export const updateStickyNote = (db, id, updatedNoteData, collection) => {
    const transaction = db.transaction(collection, "readwrite");
    const store = transaction.objectStore(collection);
    const request = store.get(id);
    request.onsuccess = () => {
      const updateNote = request.result;
      Object.keys(updatedNoteData).forEach(key => {
        updateNote[key] = updatedNoteData[key];
      });
  
      const updateRequest = store.put(updateNote);
      updateRequest.onsuccess = () => console.log("Note updated successfully!");
    };
  }
  export const deleteStickyNote = (db, id, collection) => {
    const transaction = db.transaction(collection, "readwrite");
    const store = transaction.objectStore(collection);
  
    const request = store.delete(id); // Delete the note by ID
    request.onsuccess = () => console.log("Note deleted!");
  }
  
  