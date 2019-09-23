import _ from 'lodash';

export default {
  inject: ['$v'],
  computed: {
    isValid () {
      return _.get(this.$v, '$errors', []).length === 0;
    }
  }
};
