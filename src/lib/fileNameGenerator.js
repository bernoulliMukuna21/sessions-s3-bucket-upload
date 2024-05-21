const crypto = require('crypto')

module.exports.generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex')