const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../../middleware/index').config;

// TODO: REFACTOR THIS ****. and update the locations.
class JWToken {
  /**
     *
     * @param {dict} data that token should have
     * @param {dict} settings jsonwebtoken settings
     * @returns the signed jwt
     */
  static async generate(data, settings = {}) {
    const privateKey = fs.readFileSync(config.JWT_PRIVATE_KEY_FILE);
    const token = await jwt.sign(data, privateKey, {
      algorithm: 'RS256',
      expiresIn: settings?.expiresIn || '4h',
      ...settings,
    });
    return token;
  }

  /**
     * We validate the integrity of the token and if needed some other parameters.
     * @param {str} token
     * @param {dict} settings
     * @returns the dict is data stored inside the token, boolean is whether is valid or not
     */
  static async validate(token, settings = {}) {
    const publicKey = fs.readFileSync(config.JWT_PUBLIC_KEY_FILE);
    const data = await jwt.verify(token, publicKey, {
      algorithm: 'RS256',
      ...settings,
    });
    return [data, true];
  }
}

module.exports = JWToken;