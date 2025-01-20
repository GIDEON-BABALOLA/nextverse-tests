const bookmarkss = [
    
    {
        _id: '675016571326a9b55d95fecb',
        author: 'User_8',
        avatar: 'https://res.cloudinary.com/doctr0fct/image/upload/v1730507556/Avatars/s0tt5avbtddnlnvvog21_l1wzqu.jpg',
        title: 'Petals of a Forgotten Rose',
        estimatedReadingTime: { minutes: 3, seconds: 33 },
        category: 'romance',
        picture: [
          'https://res.cloudinary.com/doctr0fct/image/upload/v1733301848/Story/user8%40gmail.com/qtz7ayjhxnvq3eppummg.jpg'
        ],
        likes: [],
        bookmarks: [ [Object] ],
        createdAt: "2025-01-11T12:07:04.736Z"
      },
    {
      _id: '675013051326a9b55d95fe4e',
      author: 'User_7',
      avatar: 'https://res.cloudinary.com/doctr0fct/image/upload/v1730507546/Avatars/i5fs4w9lukc3zdcqmiam_fnlvfi.jpg',
      title: 'The Lighthouse Keeper’s Curse',
      estimatedReadingTime: { minutes: 4, seconds: 12 },
      category: 'romance',
      picture: [
        'https://res.cloudinary.com/doctr0fct/image/upload/v1733300996/Story/user7%40gmail.com/zo63cj6kjlsxujc3yifz.jpg',
        'https://res.cloudinary.com/doctr0fct/image/upload/v1733300998/Story/user7%40gmail.com/huossuektmpia9ftxnlx.jpg'
      ],
      likes: [],
      bookmarks: [ [Object] ],
      createdAt: "2025-01-11T12:07:09.595Z"
    },
    {
      _id: '675014401326a9b55d95fe87',
      author: 'User_8',
      avatar: 'https://res.cloudinary.com/doctr0fct/image/upload/v1730507556/Avatars/s0tt5avbtddnlnvvog21_l1wzqu.jpg',
      title: 'Beneath the Crimson Waves',
      estimatedReadingTime: { minutes: 4, seconds: 12 },
      category: 'romance',
      picture: [
        'https://res.cloudinary.com/doctr0fct/image/upload/v1733301314/Story/user8%40gmail.com/iaz7kinpnndhxwynvhi6.jpg'
      ],
      likes: [],
      bookmarks: [ [Object] ],
      createdAt: "2025-01-11T12:07:07.191Z"
    },
    {
        _id: '675016571326a9b55d95fecb',
        author: 'User_8',
        avatar: 'https://res.cloudinary.com/doctr0fct/image/upload/v1730507556/Avatars/s0tt5avbtddnlnvvog21_l1wzqu.jpg',
        title: 'Golang',
        estimatedReadingTime: { minutes: 3, seconds: 33 },
        category: 'romance',
        picture: [
          'https://res.cloudinary.com/doctr0fct/image/upload/v1733301848/Story/user8%40gmail.com/qtz7ayjhxnvq3eppummg.jpg'
        ],
        likes: [],
        bookmarks: [ [Object] ],
        createdAt: "2025-01-11T12:17:04.736Z"
      }
  ]
const sortedBookmarks = bookmarkss.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
console.log(sortedBookmarks)
console.log(new Date("2025-01-11T12:17:04.736Z") - new Date("2025-01-11T12:07:07.191Z"))
