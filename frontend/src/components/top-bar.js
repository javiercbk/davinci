import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';

export default {
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
    },
    isAnthropometriesSearch () {
      return this.$router.currentRoute.name === 'anthropometries-search';
    },
    isPatientsSearch () {
      return this.$router.currentRoute.name === 'patients-search';
    },
    isSportsSearch () {
      return this.$router.currentRoute.name === 'sports-search';
    },
    canManageSport () {
      return _.findIndex(_.get(this.user, 'roles', []), r => r === 'Sport_manage_all') !== -1;
    }
  },
  methods: {
    ...mapActions('session', ['logout']),
    performLogout () {
      this.logout().then(() => {
        this.$router.replace({
          name: 'index'
        });
      });
    }
  }
};
