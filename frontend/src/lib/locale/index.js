// global document
// import Vuelidate from 'vuelidate';

/**
 * @param {Object} i18n the Vue I18N module isntance
 * @param {Strong} locale the locale string
 */
export const changeLocale = (i18n, locale) => {
  const htmlElement = document.querySelector('html');
  htmlElement.lang = locale;
  // eslint-disable-next-line no-param-reassign
  i18n.locale = locale;
  // change the locale
  // Vuelidate.localize(locale);
};
