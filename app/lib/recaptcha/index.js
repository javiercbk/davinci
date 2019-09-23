const axios = require('axios');

const { DAVINCI_RECAPTCHA_SECRET } = require('../config');

class RecaptchaValidator {
  constructor() {
    this.httpClient = axios;
  }

  async validate(recaptchaCode, ipAddress) {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(
      DAVINCI_RECAPTCHA_SECRET
    )}&response=${encodeURIComponent(recaptchaCode)}&remoteip=${encodeURIComponent(ipAddress)}`;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    const response = await this.httpClient.get(url);
    if (response.status !== 200) {
      throw new Error(response);
    }
  }
}

module.exports = RecaptchaValidator;
