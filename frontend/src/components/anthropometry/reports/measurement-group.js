import ComparisonIcon from './comparison-icon.vue';

export default {
  components: {
    ComparisonIcon
  },
  props: {
    groupName: {
      type: String,
      default: () => ''
    },
    measurements: {
      type: Array,
      default: () => []
    },
    comparison: {
      type: Array
    }
  },
  computed: {
    hasComparison () {
      return this.comparison && this.comparison.length > 0;
    }
  }
};
