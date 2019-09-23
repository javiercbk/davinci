import _ from 'lodash';
import { isRequiredProp } from '../../lib/anthropometry';

const noNull = v => v !== null;
const areDefined = (arr1, arr2) => arr1 || arr2;
const someNull = (arr1, arr2) => (arr1 && !arr2) || (!arr1 && arr2);
const lenghtDoesNotMatch = (arr1, arr2) => arr1.length !== arr2.length;
const notEqual = (arr1, arr2) => {
  const filtered1 = _.filter(arr1, noNull);
  const filtered2 = _.filter(arr2, noNull);
  return !_.isEqual(filtered1, filtered2);
};
const areDifferentArrays = (arr1, arr2) => areDefined(arr1, arr2)
  && (someNull(arr1, arr2) || lenghtDoesNotMatch(arr1, arr2) || notEqual(arr1, arr2));

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    isMissing: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    maxMeasurements: {
      type: Number,
      default: 5
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    }
  },
  data () {
    return {
      valueArray: []
    };
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue && newValue.length) {
          // only assign value if array value is different
          if (areDifferentArrays(newValue, oldValue)) {
            this.valueArray = newValue;
          }
        } else {
          this.valueArray = [null, null, null];
        }
      }
    },
    valueArray (newValueArray, oldValueArray) {
      // only emit input event if array value is different
      if (areDifferentArrays(newValueArray, oldValueArray)) {
        this.$emit('input', newValueArray);
      }
    }
  },
  computed: {
    canAddMoreMeasurements () {
      return this.valueArray.length < this.maxMeasurements;
    },
    cleanValueArray () {
      return this.valueArray.filter(v => v != null);
    },
    isRequired () {
      return isRequiredProp(this.name);
    },
    isRequiredValid () {
      if (this.isRequired) {
        return _.some(this.value, v => v !== null && v !== undefined && v !== 0);
      }
      return false;
    }
  },
  methods: {
    onInputChange (index, event) {
      let measurement = null;
      try {
        measurement = Number.parseFloat(_.trim(event.target.value));
      } catch (e) {
        // nothing to do, just let the value as null
      }
      let clone = this.valueArray.slice(0);
      // will allways have capacity
      clone[index] = measurement;
      clone = _.map(clone, val => val || null);
      this.valueArray = clone;
    },
    onBlur (index) {
      if (
        this.valueArray[index]
        && index + 1 >= this.valueArray.length
        && this.canAddMoreMeasurements
      ) {
        this.add(true);
      }
    },
    onTab (index) {
      if (
        this.valueArray[index]
        && index + 1 >= this.valueArray.length
        && this.canAddMoreMeasurements
      ) {
        this.add(true);
      }
    },
    add (shouldFocus = false) {
      if (this.canAddMoreMeasurements) {
        this.valueArray.push(null);
        if (shouldFocus) {
          setTimeout(() => {
            let element;
            const elements = this.$refs.measurementInput;
            if (_.isArray(elements)) {
              const elementsLen = elements.length;
              element = elements[elementsLen - 1];
            } else {
              element = elements;
            }
            element.focus();
          }, 100);
        }
      }
    }
  }
};
