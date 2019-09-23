import {
  initRecaptcha,
  resetRecaptcha
} from '../../lib/form';

export default {
  props: {
    siteKey: {
      type: String,
      required: true,
    },
  },
  mounted () {
    this.loadRecaptcha();
  },
  data () {
    return {
      recaptcha: null,
      recaptchaWidgetId: null,
    };
  },
  watch: {
    recaptcha (newValue) {
      this.recaptcha = newValue;
      this.$emit('re-captcha-validation', newValue);
    },
  },
  methods: {
    loadRecaptcha () {
      this.$emit('re-captcha-loading', true);
      setTimeout(() => {
        if (typeof grecaptcha === 'undefined') {
          this.loadRecaptcha();
        } else {
          this.recaptchaWidgetId = initRecaptcha('g_recaptcha', (response) => {
            this.recaptcha = response;
          }, () => {
            this.recaptcha = null;
          });
          this.$emit('re-captcha-loading', false);
        }
      }, 500);
    },
    reset () {
      this.recaptcha = null;
      resetRecaptcha(this.recaptchaWidgetId);
    },
  },
};
