const myNotes =  [
]
const myNotesInDetails = myNotes.map(note => ({
    ...note, // Spread existing properties
    sharedWith: note.owners.filter(owner => owner.userId !== note.userId).length // Add new attribute
  }));
  console.log(myNotesInDetails)
  console.log("Great day today")