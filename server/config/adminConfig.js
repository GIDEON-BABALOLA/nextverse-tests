const crypto = require('crypto');
const adminEmails = [
  "02b7825b032f1bb701417de6dfb47e447cf6c387423e3dbd1b822ee17f939d89", //nextverse.101@gmail.com
  "0fd8ccf8d7444eb75eabc3bed11199628a1d4413adc9ee4cbb5a35ca41470178", //gideonbabalola69@gmail.com
  "33e6cbdec8193b8602f26d033e8586b5496b8945eb1c89ae6fb6d67b780c94ff" //nextverse74@gmail.com
]
  //This are only the emails that can create an admin
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
