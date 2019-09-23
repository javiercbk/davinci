import _ from 'lodash';
import AnthropometryMeasurements from './anthropometry-measurements.vue';
import { emptyAnthropometry } from '../../lib/anthropometry';

export default {
  components: {
    AnthropometryMeasurements
  },
  props: {
    anthropometry: {
      type: Object,
      default: emptyAnthropometry()
    },
    syncDelay: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      timeoutId: null,
      innerAnthropometry: emptyAnthropometry()
    };
  },
  computed: {
    patientId () {
      return _.get(this.patient, '_id', null);
    }
  },
  watch: {
    anthropometry (newValue) {
      this.innerAnthropometry = newValue;
    },
    innerAnthropometry: {
      deep: true,
      handler () {
        this.$emit('input', this.innerAnthropometry);
      }
    }
  }
};
