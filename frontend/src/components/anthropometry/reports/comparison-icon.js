import { faCaretUp, faCaretDown, faEquals } from '@fortawesome/free-solid-svg-icons';

export default {
  props: {
    comp: {
      type: Number,
      required: true
    },
    val: {
      type: Number,
      required: true
    }
  },
  computed: {
    comparisonClasses () {
      if (this.comp < this.val) {
        return 'comparison-green';
      }
      if (this.comp > this.val) {
        return 'comparison-red';
      }
      return '';
    },
    comparisonIcon () {
      if (this.comp < this.val) {
        return faCaretUp;
      }
      if (this.comp > this.val) {
        return faCaretDown;
      }
      return faEquals;
    }
  }
};
