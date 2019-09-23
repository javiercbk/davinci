import _ from 'lodash';

import ComparisonIcon from './comparison-icon.vue';

export default {
  components: {
    ComparisonIcon
  },
  props: {
    mass: {
      type: Object,
      default: null
    }
  },
  computed: {
    hasComparison () {
      return !_.isNil(_.get(this.mass, 'comparison'));
    }
  }
};
