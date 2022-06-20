const bcrypt = require('bcrypt');

class Password {
  SALT_ROUNDS = 10;

  /**
     * Hash a string, or your password.
     *
     * @param {string} password
     * @returns the string hashed
     */
  static async generate(data) {
    const salt = await bcrypt.genSalt(Password.SALT_ROUNDS);
    const response = await bcrypt.hash(data, salt);
    return response;
  }

  /**
     * Validate your hash if it corresponds to your plain text data
     *
     * @param {str} plainText
     * @param {str} hash
     * @returns true if it corresponds,false otherwise
     */
  static async verify(plainText, hash) {
    return bcrypt.compare(plainText, hash);
  }
}

module.exports = Password;