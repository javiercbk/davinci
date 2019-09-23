import _ from 'lodash';
import { mapGetters } from 'vuex';

import TopBar from '../../components/top-bar.vue';

export default {
  components: {
    TopBar
  },
  computed: {
    ...mapGetters('session', ['user']),
    userName () {
      if (this.user) {
        if (this.user.firstName) {
          return `${_.get(this, 'user.firstName')} ${_.get(this, 'user.lastName')}`;
        }
        return _.get(this, 'user.lastName');
      }
      return '';
    }
  },
  methods: {
    changeLanguage (newLanguage) {
      this.$i18n.locale = newLanguage;
    }
  }
};
