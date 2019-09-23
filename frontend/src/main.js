import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCaretUp,
  faCaretDown,
  faCog,
  faEquals,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './app.vue';
import router from './router';
import store from './store';
// do not configure service workers
// import './registerServiceWorker';
import './filters';
import './bootstrap';
import { i18n } from './i18n';

library.add(faCaretUp, faCaretDown, faCog, faEquals, faSpinner);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  i18n,
  validations: {},
  render: h => h(App)
}).$mount('#app');
