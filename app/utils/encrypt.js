const md5 = require('md5');

function encrypt (password) {
  return md5(password);
}

module.exports = encrypt;