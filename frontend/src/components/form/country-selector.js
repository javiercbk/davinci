import _ from 'lodash';
import { mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';

const CUSTOM_PROPS = ['options', 'track-by', 'trackBy', 'label', 'value'];

const CUSTOM_LISTENERS = ['input'];


export default {
  components: {
    Multiselect,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    ...Multiselect.props,
  },
  data () {
    return {
      countrySelected: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue) {
        if (newValue) {
          const countrySelected = _.find(this.countryList, c => c.value === newValue);
          if (countrySelected) {
            this.$set(this, 'countrySelected', countrySelected);
          } else {
            this.countrySelected = null;
          }
        } else {
          this.countrySelected = null;
        }
      },
    },
    'countrySelected.value': {
      handler (newCountrySelectedValue) {
        this.$emit('input', newCountrySelectedValue || null);
      },
    },
  },
  computed: {
    ...mapGetters('countries', ['countryList']),
    wrappedProps () {
      return _.omit(this.$props, CUSTOM_PROPS);
    },
    wrappedListeners () {
      return _.omit(this.$listeners, CUSTOM_LISTENERS);
    },
  },
};
