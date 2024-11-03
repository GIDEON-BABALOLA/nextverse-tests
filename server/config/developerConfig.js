const crypto = require('crypto');
const developerEmails = [
  "0fd8ccf8d7444eb75eabc3bed11199628a1d4413adc9ee4cbb5a35ca41470178",
  "034877e44d7235de0d1132eef682bbbeebfeee67cabed926d0c81a45ed8f7fa7",
  "02b7825b032f1bb701417de6dfb47e447cf6c387423e3dbd1b822ee17f939d89",

  ]
const developerConfirmationArray = developerEmails.map((developer) => {
    return developer
})
function hashDeveloperEmail(text) {
  const hash = crypto.createHash('sha256'); // Create SHA-256 hash object
  hash.update(text); // Update the hash with the input text
  const hashedText = hash.digest('hex'); // Generate the hash in hexadecimal format
  return hashedText;
}
module.exports =   { developerConfirmationArray, hashDeveloperEmail}
