/* global grecaptcha */
export const initRecaptcha = (
  elementId, verifiedCallback,
  expiredCallback
) => grecaptcha.render(elementId, {
  sitekey: '6LdbKGQUAAAAAGJrlCGDlLtNp2i3L5koCWYRC1u_',
  callback: verifiedCallback,
  'expired-callback': expiredCallback,
});

export const resetRecaptcha = (widgetId) => {
  grecaptcha.reset(widgetId);
};

export const formFieldState = (validationState) => {
  if (!validationState.$dirty && !validationState.$model) {
    return null;
  }
  if (validationState.$error) {
    return 'invalid';
  }
  return 'valid';
};
