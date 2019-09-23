import _ from 'lodash';
import {
  mapActions
} from 'vuex';
import {
  email,
  maxLength,
  required
} from 'vuelidate/lib/validators';
import LoginService from '../../services/login/login-service';

const loginService = new LoginService();

export default {
  data () {
    return {
      email: '',
      password: ''
    };
  },
  validations: {
    email: {
      required,
      email,
      maxLength: maxLength(256),
    },
    password: {
      required,
      maxLength: maxLength(256),
    }
  },
  methods: {
    ...mapActions('session', ['setUser', 'setCSRFToken']),
    ...mapActions('notifications', ['pushNotification']),
    login () {
      if (!this.$v.$errors) {
        loginService
          .authenticate(_.pick(this, ['email', 'password']))
          .then((response) => {
            // store the user info
            this.setCSRFToken(response.data.data.csrfToken);
            this.setUser(response.data.data.user);
          })
          .catch(() => {
            // show error message
            this.pushNotification({
              title: this.$t('login.failed'),
              message: this.$t('login.failedMessage'),
              variant: 'warning'
            });
          });
      }
    }
  }
};
