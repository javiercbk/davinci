import Vue from 'vue';
import Vuex from 'vuex';
import countries from './stores/countries';
import events from './stores/events';
import languages from './stores/languages';
import notifications from './stores/notifications';
import session from './stores/session';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    countries,
    events,
    languages,
    notifications,
    session
  }
});
