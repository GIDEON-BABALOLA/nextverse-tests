const crypto = require('crypto');
const adminEmails = [process.env.ADMIN_ONE, process.env.ADMIN_TWO, process.env.ADMIN_THREE]
const adminConfirmationArray = adminEmails.map((admin) => {
    return admin
})
function hashAdminEmail(text) {
  const hash = crypto.createHash('sha256'); // Create SHA-256 hash object
  hash.update(text); // Update the hash with the input text
  const hashedText = hash.digest('hex'); // Generate the hash in hexadecimal format
  return hashedText;
}
module.exports =   { adminConfirmationArray, hashAdminEmail}
