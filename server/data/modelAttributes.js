const generalAttributes = [
  "username",
  "email",
  "password",
  "mobile",
  "accessToken",
  "refreshToken",
  "picture",
  "role",
  "ipAddress",
  "followers",
  "following",
  "totalfollowing",
  "totalfollowers",
  "stories",
  "bookmarks",
  "createdAt",
  "updatedAt"
];

const userAttributes = [
  ...generalAttributes,
  "verification",
  "bio",
  "status",
  "verificationToken",
  "verificationCode",
  "verificationTokenExpires",
  "newsletter"
];

const adminAttributes = [
  ...generalAttributes,
  "verification"
];

const developerAttributes = [
  ...generalAttributes,
  "title",
  "socials"
];

const designerAttributes = [
  ...generalAttributes,
  "title",
  "socials"
];  
  module.exports = { userAttributes, adminAttributes, developerAttributes, designerAttributes}
  