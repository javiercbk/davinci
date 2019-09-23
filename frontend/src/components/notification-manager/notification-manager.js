import {
  mapGetters
} from 'vuex';

export default {
  computed: {
    ...mapGetters('notifications', ['notifications']),
  },
};
