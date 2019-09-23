class RecapthaValidatorMock {
  async validate(recaptchaCode) {
    if (typeof recaptchaCode === 'string' && recaptchaCode.indexOf('fail') !== -1) {
      throw new Error('recaptcha failed');
    }
  }
}

module.exports = RecapthaValidatorMock;
