import _ from 'lodash';
import { email, maxLength, minLength, required } from 'vuelidate/lib/validators';
import Recaptcha from '../../components/form/recaptcha.vue';
import UserService from '../../services/user/user-service';

const userService = new UserService();

export default {
  components: {
    Recaptcha
  },
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      recaptcha: null,
      recaptchaValidated: false,
      recaptchaLoading: true,
      emailAlreadyExist: ''
    };
  },
  validations: {
    email: {
      required,
      email,
      maxLength: maxLength(256),
      unique (emailToValidate) {
        return emailToValidate === '' || this.emailAlreadyExist !== emailToValidate;
      }
    },
    firstName: {
      required,
      maxLength: maxLength(150)
    },
    lastName: {
      required,
      maxLength: maxLength(150)
    },
    password: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(256)
    }
  },
  methods: {
    onRecaptchaValidation (recaptcha) {
      if (typeof recaptcha === 'string') {
        this.recaptcha = recaptcha;
        this.recaptchaValidated = true;
      }
    },
    onRecaptchaLoading (loading) {
      this.recaptchaLoading = loading;
    },
    createAccount () {
      let newAccount;
      this.emailAlreadyExist = '';
      if (!this.recaptchaLoading && this.recaptchaValidated) {
        if (!this.$v.$invalid) {
          newAccount = _.pick(this, ['email', 'password', 'firstName', 'lastName', 'recaptcha']);
          userService
            .create(newAccount)
            .then(() => {
              // TODO: show a message
              this.$router.push({
                name: 'index'
              });
            })
            .catch((error) => {
              if (error.response.status === 409) {
                this.emailAlreadyExist = newAccount.email;
              } else {
                // FIXME: show error message
                console.log(error.response.status);
                this._formReset();
              }
            });
        }
      }
    },
    _formReset () {
      this.recaptcha = null;
      this.recaptchaValidated = false;
      this.$refs.recaptcha.reset();
    }
  }
};
