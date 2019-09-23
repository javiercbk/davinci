import _ from 'lodash';

const ORIGIN_X = 99.04;
const ORIGIN_Y = 94.2;
// const NEGATIVE_SIX_X = 24.25;
const POSITIVE_SIX_X = 173.81;
const POSITIVE_TEN_Y = 29.74;
// const NEGATIVE_TEN_Y = 156.4;

const transformX = v => (((POSITIVE_SIX_X - ORIGIN_X) / (6 - 0)) * (v - 0)) + ORIGIN_X;
const transformY = v => (((POSITIVE_TEN_Y - ORIGIN_Y) / (10 - 0)) * (v - 0)) + ORIGIN_Y;

const transformData = (d) => {
  if (_.isArray(d.values)) {
    return _.map(d.values, v => transformData({
      label: d.label,
      values: {
        x: v.x,
        y: v.y,
      },
    }));
  }
  const x = transformX(d.values.x);
  const y = transformY(d.values.y);
  return {
    label: `${d.label} x: ${d.values.x.toFixed(2)} y: ${d.values.y.toFixed(2)}`,
    x,
    y,
  };
};

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    topCenterLabel: {
      type: String,
      default: () => '',
    },
    bottomLeftLabel: {
      type: String,
      default: () => '',
    },
    bottomRightLabel: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    current () {
      if (this.value && this.value.current) {
        return transformData(this.value.current);
      }
      return null;
    },
  },
};
