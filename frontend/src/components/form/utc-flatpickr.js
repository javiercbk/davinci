import _ from 'lodash';
import moment from 'moment';
import FlatPickr from 'vue-flatpickr-component';

const now = moment();
const offsetHours = now.diff(now.utc(), 'hours');

const CUSTOM_PROPS = ['value', 'format'];
const CUSTOM_LISTENERS = ['input'];

export default {
  components: {
    FlatPickr
  },
  props: {
    format: {
      type: String
    },
    value: {
      type: String,
      default: '',
    },
    ..._.omit(FlatPickr.props, CUSTOM_PROPS)
  },
  data () {
    return {
      clientDate: null,
      clientDateStr: null,
    };
  },
  computed: {
    wrappedProps () {
      return _.omit(this.$props, CUSTOM_PROPS);
    },
    wrappedListeners () {
      return _.omit(this.$listeners, CUSTOM_LISTENERS);
    },
    isoDate () {
      if (this.clientDate) {
        return this.clientDate.toISOString();
      }
      return null;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue) {
        if (newValue) {
          this._onInputChange(newValue);
        }
      },
    },
    isoDate (newValue) {
      this.$emit('input', newValue);
    },
    clientDateStr (newClientDate) {
      // client date will always be in client hour
      const clientMoment = moment(newClientDate);
      if (clientMoment.isValid()) {
        this.clientDate = moment.utc(newClientDate).add(-offsetHours, 'hours');
      } else {
        this.clientDateStr = null;
        this.clientDate = null;
      }
    },
  },
  methods: {
    _onInputChange (newValue) {
      // value will always be utc date
      const date = moment.utc(newValue).add(offsetHours, 'hours');
      if (!this.clientDate || !date.isSame(this.clientDate)) {
        this.clientDateStr = date.format(this.format);
        this.clientDate = date;
      }
    },
  },
};
