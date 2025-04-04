const data = [
  {
    "username": "user1",
    "followers": 381,
    "following": 145,
    "newsletter": false,
    "stories": 29,
    "likes": 245,
    "dateJoined": "2020-11-14",
    "lastSeen": "2024-06-20",
    "delete": false
  },
  {
    "username": "user2",
    "followers": 195,
    "following": 937,
    "newsletter": true,
    "stories": 16,
    "likes": 926,
    "dateJoined": "2020-07-19",
    "lastSeen": "2024-12-18",
    "delete": false
  },
  {
    "username": "user3",
    "followers": 505,
    "following": 122,
    "newsletter": true,
    "stories": 65,
    "likes": 457,
    "dateJoined": "2020-10-26",
    "lastSeen": "2024-10-17",
    "delete": false
  },
  {
    "username": "user4",
    "followers": 748,
    "following": 661,
    "newsletter": false,
    "stories": 18,
    "likes": 623,
    "dateJoined": "2020-06-27",
    "lastSeen": "2024-07-25",
    "delete": false
  },
  {
    "username": "user5",
    "followers": 867,
    "following": 455,
    "newsletter": false,
    "stories": 31,
    "likes": 163,
    "dateJoined": "2020-04-18",
    "lastSeen": "2024-09-21",
    "delete": false
  },
  {
    "username": "user6",
    "followers": 131,
    "following": 206,
    "newsletter": true,
    "stories": 35,
    "likes": 289,
    "dateJoined": "2020-03-15",
    "lastSeen": "2024-11-13",
    "delete": false
  }
];
const combineData = (data) => {
  const result = data.reduce((acc, dat) => {
    acc.usernames = acc.usernames || [];
    acc.followers = acc.followers || [];
    acc.following = acc.following || [];
    acc.likes = acc.likes || [];
    acc.delete = acc.delete || [];

    acc.usernames.push( dat.username);
    acc.followers.push( dat.followers);
    acc.following.push( dat.following);
    acc.likes.push( dat.likes);
    acc.delete.push(dat.delete);

    return acc;
  }, {});

  return result;
};
const globe = Object.entries(combineData(data)).flatMap(([key, value]) => value);