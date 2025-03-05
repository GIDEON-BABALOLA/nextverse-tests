const myNotes =  [
    {
        "_id": "67c863dc2fda27896cb95032",
        "author": "User_8",
        "title": "Real Madrid",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c863dc2fda27896cb95034"
            }
        ],
        "createdAt": "2025-03-05T14:46:52.828Z",
        "updatedAt": "2025-03-05T14:46:52.838Z",
        "sharedWith": 1
    },
    {
        "_id": "67c8643f2d981ea579c050c3",
        "author": "User_8",
        "title": "Fifa",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c8643f2d981ea579c050c5"
            }
        ],
        "createdAt": "2025-03-05T14:48:31.227Z",
        "updatedAt": "2025-03-05T14:48:31.242Z",
        "sharedWith": 1
    },
    {
        "_id": "67c868334ab501e88e703295",
        "author": "User_8",
        "title": "Litenote",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c868334ab501e88e703297"
            }
        ],
        "createdAt": "2025-03-05T15:05:23.435Z",
        "updatedAt": "2025-03-05T15:05:23.441Z",
        "sharedWith": 1
    },
    {
        "_id": "67c868794ab501e88e7032b5",
        "author": "User_8",
        "title": "Liverpool",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c8687a4ab501e88e7032b7"
            }
        ],
        "createdAt": "2025-03-05T15:06:33.988Z",
        "updatedAt": "2025-03-05T15:06:34.028Z",
        "sharedWith": 1
    },
    {
        "_id": "67c868864ab501e88e7032d5",
        "author": "User_8",
        "title": "Mofope",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c868864ab501e88e7032d7"
            }
        ],
        "createdAt": "2025-03-05T15:06:46.385Z",
        "updatedAt": "2025-03-05T15:06:46.388Z",
        "sharedWith": 1
    },
    {
        "_id": "67c868944ab501e88e7032f5",
        "author": "User_8",
        "title": "Floo",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c868944ab501e88e7032f7"
            }
        ],
        "createdAt": "2025-03-05T15:07:00.431Z",
        "updatedAt": "2025-03-05T15:07:00.440Z",
        "sharedWith": 1
    },
    {
        "_id": "67c868a44ab501e88e703315",
        "author": "User_8",
        "title": "FOLBEN ",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c868a44ab501e88e703317"
            }
        ],
        "createdAt": "2025-03-05T15:07:16.807Z",
        "updatedAt": "2025-03-05T15:07:16.811Z",
        "sharedWith": 1
    },
    {
        "_id": "67c86aad8460f868281812c3",
        "author": "User_8",
        "title": "Real Madrid",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c86aad8460f868281812c5"
            }
        ],
        "createdAt": "2025-03-05T15:15:57.540Z",
        "updatedAt": "2025-03-05T15:15:57.545Z",
        "sharedWith": 1
    },
    {
        "_id": "67c86ae18460f8682818133b",
        "author": "User_8",
        "title": "Hala Madrid",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c86ae18460f8682818133d"
            }
        ],
        "createdAt": "2025-03-05T15:16:49.802Z",
        "updatedAt": "2025-03-05T15:16:49.803Z",
        "sharedWith": 1
    },
    {
        "_id": "67c881258460f86828181c7f",
        "author": "User_8",
        "title": "Liverpool is one of the best foothball clubs",
        "userId": "674f240a41b20369be542b69",
        "owners": [
            {
                "userId": "674f240a41b20369be542b69",
                "_id": "67c881258460f86828181c81"
            }
        ],
        "createdAt": "2025-03-05T16:51:49.399Z",
        "updatedAt": "2025-03-05T16:51:49.405Z",
        "sharedWith": 1
    }
]
const myNotesInDetails = myNotes.map(note => ({
    ...note, // Spread existing properties
    sharedWith: note.owners.filter(owner => owner.userId !== note.userId).length // Add new attribute
  }));
  console.log(myNotesInDetails)