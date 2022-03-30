const bcrypt = require('bcrypt');
const saltRounds = 10;
// sha512

module.exports = {
  hashPassword(password) {
    // console.log(password, 'yes');
    return bcrypt.hash(password, saltRounds);
  },
  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
};
