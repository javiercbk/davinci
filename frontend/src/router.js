/* eslint-disable implicit-arrow-linebreak */
import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

// eslint-disable-next-line
const Welcome = () => import(/* webpackChunkName: 'index' */ './views/home/welcome.vue');
// eslint-disable-next-line
const AccountCreation = () =>
  import(/* webpackChunkName: 'accountCreation' */ './views/account/account-create.vue');
// eslint-disable-next-line
const UserSettings = () =>
  import(/* webpackChunkName: 'user' */ './views/home/user/user-settings.vue');
// eslint-disable-next-line
const PatientSearch = () =>
  import(/* webpackChunkName: 'patient' */ './views/home/patient/patient-search.vue');
// eslint-disable-next-line
const PatientCreate = () =>
  import(/* webpackChunkName: 'patient' */ './views/home/patient/patient-create.vue');
// eslint-disable-next-line
const AnthropometrySearch = () =>
  import(/* webpackChunkName: 'anthropometries' */ './views/home/anthropometry/anthropometries-search.vue');
// eslint-disable-next-line
const AnthropometryCreate = () =>
  import(/* webpackChunkName: 'anthropometries' */ './views/home/anthropometry/anthropometries-create.vue');
// eslint-disable-next-line
const AnthropometryReport = () =>
  import(/* webpackChunkName: 'anthropometries' */ './views/home/anthropometry/anthropometry-view-report.vue');
const SportSearch = () =>
  import(/* webpackChunkName: 'sport' */ './views/home/sport/sport-search.vue');
const SportCreate = () =>
  import(/* webpackChunkName: 'sport' */ './views/home/sport/sport-create.vue');

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return {
      selector: to.hash
    };
  }
  return {
    x: 0,
    y: 0
  };
};

const router = new Router({
  // eslint-disable-next-line
  routes: [
    {
      path: '/',
      name: 'index',
      component: Welcome,
      meta: {
        public: true
      }
    },
    {
      path: '/account/create',
      name: 'create-account',
      component: AccountCreation,
      meta: {
        public: true,
        onlyPublic: true
      }
    },
    {
      path: '/users/:userId/settings',
      name: 'user-settings',
      component: UserSettings,
      props: true
    },
    {
      path: '/patients',
      name: 'patients-search',
      component: PatientSearch
    },
    {
      path: '/patients/create',
      name: 'patients-create',
      component: PatientCreate
    },
    {
      path: '/patients/:entityId/details',
      name: 'patients-edit',
      component: PatientCreate,
      props: true
    },
    {
      path: '/anthropometries',
      name: 'anthropometries-search',
      component: AnthropometrySearch,
      props: true
    },
    {
      path: '/anthropometries/create',
      name: 'anthropometries-create',
      component: AnthropometryCreate
    },
    {
      path: '/anthropometries/:entityId/details',
      name: 'anthropometries-edit',
      component: AnthropometryCreate,
      props: true
    },
    {
      path: '/anthropometries/:entityId',
      name: 'anthropometry-report',
      component: AnthropometryReport,
      props: true
    },
    {
      path: '/anthropometries/:entityId/compare/:compareId/details',
      name: 'anthropometry-report-compare',
      component: AnthropometryReport,
      props: true
    },
    {
      path: '/sports',
      name: 'sports-search',
      component: SportSearch
    },
    {
      path: '/sports/create',
      name: 'sports-create',
      component: SportCreate
    },
    {
      path: '/sports/:entityId/details',
      name: 'sports-edit',
      component: SportCreate,
      props: true
    }
  ],
  mode: 'history',
  scrollBehavior
});

const routerSecurityCheck = (user, to, from, next, isFirstTime) => {
  let nextResolve;
  if (user) {
    if (to.meta && to.meta.public && to.name !== 'index') {
      nextResolve = {
        name: 'index'
      };
    } else if (to.meta.role) {
      const missingRole = user.roles.indexOf(to.meta.role) === -1;
      if (missingRole) {
        // user has not enough privileged to see the view
        // TODO define what to do here
        nextResolve = {
          name: 'index'
        };
      }
    }
  } else if (to.meta && !to.meta.public) {
    if (isFirstTime) {
      store._actions['session/setFirstRoute'][0](to);
    }
    nextResolve = {
      name: 'index'
    };
  }
  next(nextResolve);
};

router.beforeEach((to, from, next) => {
  const userRequested = store.getters['session/userRequested'];
  store._actions['notifications/clearScopedNotifications'][0]().then(() => {});
  if (!userRequested) {
    store._actions['session/requestUserLogged'][0]().then(() => {
      // the first route will be setted here
      const user = store.getters['session/user'];
      routerSecurityCheck(user, to, from, next, true);
    });
    return;
  }
  const user = store.getters['session/user'];
  routerSecurityCheck(user, to, from, next, false);
});

export default router;
