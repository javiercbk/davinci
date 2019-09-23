import _ from 'lodash';
import Multiselect from 'vue-multiselect';

const CUSTOM_PROPS = ['options', 'track-by', 'trackBy', 'label', 'value'];

const CUSTOM_LISTENERS = ['input'];

const ACTIVITY_LEVELS = [
  { name: 'anthropometries.activityLevel.incorrect', value: -1 },
  { name: 'anthropometries.activityLevel.sendentary', value: 0 },
  { name: 'anthropometries.activityLevel.light', value: 1 },
  { name: 'anthropometries.activityLevel.moderate', value: 2 },
  { name: 'anthropometries.activityLevel.intense', value: 3 },
  { name: 'anthropometries.activityLevel.extreme', value: 4 },
];


export default {
  components: {
    Multiselect,
  },
  props: {
    value: {
      type: Number,
    },
    ...Multiselect.props,
  },
  data () {
    return {
      activityLevelSelected: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue) {
        if (newValue) {
          const activityLevelSelected = _.find(this.activityLevels, c => c.value === newValue);
          if (activityLevelSelected) {
            this.$set(this, 'activityLevelSelected', activityLevelSelected);
          } else {
            this.activityLevelSelected = null;
          }
        } else {
          this.activityLevelSelected = null;
        }
      },
    },
    'activityLevelSelected.value': {
      handler (newActivityLevelSelected) {
        this.$emit('input', newActivityLevelSelected || null);
      },
    },
  },
  computed: {
    activityLevels () {
      return _.map(ACTIVITY_LEVELS, a => ({
        name: this.$t(a.name),
        value: a.value,
      }));
    },
    wrappedProps () {
      return _.omit(this.$props, CUSTOM_PROPS);
    },
    wrappedListeners () {
      return _.omit(this.$listeners, CUSTOM_LISTENERS);
    },
  },
};
