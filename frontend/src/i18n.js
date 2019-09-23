import _ from 'lodash';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import Promise from 'bluebird';
import store from './store';

import messages from './locales/en.json';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
});

// our default language that is preloaded
const loadedLanguages = ['en'];

function setI18nLanguage (lang) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return store._actions['countries/onLocaleChange'][0](lang).then(() => lang);
}

/**
 * loads and sets the language of the whole application.
 * @param {string} lang the language to load translations to.
 */
export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return Promise.all([
        import(/* webpackChunkName: "lang-[request]" */ `./locales/${lang}.json`),
        axios.get(`/api/sport/translations/${encodeURIComponent(lang)}`)
      ])
        .then(([msgs, sportMsgs]) => {
          const localeMessages = _.cloneDeep(msgs.default);
          const allMesgs = Object.assign({}, localeMessages, sportMsgs);
          i18n.setLocaleMessage(lang, allMesgs);
          loadedLanguages.push(lang);
          return setI18nLanguage(lang);
        })
        .catch(() => {
          console.log(`Sports translations could not be loaded for language ${lang}`);
        });
    }
    return setI18nLanguage(lang);
  }
  return Promise.resolve(lang);
}

// eslint-disable-next-line func-names
(function () {
  // loads the sports translations for the default language 'en'
  let allMesgs = _.cloneDeep(messages);
  axios
    .get('/api/sport/translations/en')
    .then((sportMsgsResponse) => {
      allMesgs = Object.assign({}, messages, sportMsgsResponse.data);
    })
    .catch(() => {
      console.log('Sports translations could not be loaded for language en');
    })
    .finally(() => {
      i18n.setLocaleMessage('en', allMesgs);
      return setI18nLanguage('en');
    });
}());
