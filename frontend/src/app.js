import { mapGetters, mapActions } from 'vuex';
import Login from './views/login/login.vue';
import LoadingApp from './views/loading-app.vue';
import Home from './views/home/home.vue';
import NotificationManager from './components/notification-manager/notification-manager.vue';

export default {
  components: {
    Home,
    LoadingApp,
    Login,
    NotificationManager
  },
  computed: {
    ...mapGetters('session', ['user', 'userRequested'])
  },
  methods: {
    ...mapActions('events', ['fireGlobalEvent']),
    onGlobalEvent (event, where) {
      this.fireGlobalEvent({
        event,
        where
      });
    }
  }
};
