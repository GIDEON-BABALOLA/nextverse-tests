const path = require("path")
const User = require(path.join(__dirname, "..", "models", "userModel.js"))
const usernameGenerator = async (username) => {
const baseUsername = username.toLowerCase().replace(/\s+/g, "");
let finalUsername = baseUsername;
let counter = 1;
while (await User.findOne({ username: finalUsername })) {
  finalUsername = `${baseUsername}${counter++}`;
}
return finalUsername
}
module.exports = { usernameGenerator }