import _ from 'lodash';
import diagramMixin from '../diagram-mixin';

const LABEL_OFFSET = 93;
const LABEL_HEIGHT = 25;
const LABEL_CIR_OFFSET = 102;
const LABEL_TEXT_OFFSET = 107.9;
const LABEL_X_POS = 550;
const LABEL_X_TEXT_POS = LABEL_X_POS + 20;
const PIE_RADIUS = 230;
const PIE_CENTER_X = 250;
const PIE_CENTER_Y = 265;
const TITLE_Y_POS = 20;

/**
 * @typedef {Object} Cartesian2DPoint
 * @property {Number} x the cartesian x point.
 * @property {Number} y the cartesian y point.
 */

/**
 * Converts an angle in degrees to radians
 * @param {Number} angle in degrees.
 * @return {Number} the angle in radians.
 */
const toRadians = angle => angle * (Math.PI / 180);

const START_RADIANS = toRadians(90);

/**
 * Calculates the cartesian x y coordinates for a percentage.
 * @param {Number} percentage between 0 and 1.
 * @return {Cartesian2DPoint} cartesian 2d point.
 */
const getCartesianForPercentage = (percentage, r = PIE_RADIUS) => {
  const angleInDegrees = 360 * percentage;
  const radian = START_RADIANS - toRadians(angleInDegrees);
  const absoluteX = (r * Math.cos(radian));
  const absoluteY = (r * Math.sin(radian));
  const x = PIE_CENTER_X + absoluteX;
  const y = PIE_CENTER_Y - absoluteY;
  return { x, y };
};

const getTextCartesianForPercentage = (oldPer, newPer) => {
  const percentage = (oldPer + newPer) / 2;
  const cartesian = getCartesianForPercentage(percentage, PIE_RADIUS / 1.3);
  cartesian.x -= 20;
  return cartesian;
};

export default {
  mixins: [diagramMixin],
  props: {
    chartLabel: {
      type: String,
      default: () => 'Pie chart',
    },
  },
  data () {
    return {
      selected: null,
    };
  },
  computed: {
    total () {
      return _.reduce(this.value, (acc, cur) => acc + _.get(cur, 'value', 0), 0);
    },
    labels () {
      if (this.total > 0) {
        return _.map(this.value, (item, index) => {
          const labelHeight = (LABEL_HEIGHT * index);
          return {
            circlePosition: LABEL_CIR_OFFSET + labelHeight,
            color: this._getColor(index),
            label: item.label,
            labelPosition: LABEL_OFFSET + labelHeight,
            textPosition: LABEL_TEXT_OFFSET + labelHeight,
          };
        });
      }
      return [];
    },
    paths () {
      if (this.total > 0) {
        let acc = 0;
        return _.map(this.value, (item, index) => {
          const accPercentage = acc / this.total;
          const accCartesian = getCartesianForPercentage(accPercentage);
          const valuePercentage = item.value / this.total;
          acc += item.value;
          const spinPercentage = acc / this.total;
          const trgCartesian = getCartesianForPercentage(spinPercentage);
          const textCartesian = getTextCartesianForPercentage(accPercentage, spinPercentage);
          const moveCenter = `M${PIE_CENTER_X},${PIE_CENTER_Y}`;
          const drawFirstLine = `L${accCartesian.x},${accCartesian.y}`;
          const drawFirstArc = `A${PIE_RADIUS},${PIE_RADIUS},0,0,1,${trgCartesian.x},${trgCartesian.y}`;
          const lineToCenter = `L${PIE_CENTER_X},${PIE_CENTER_Y}`;
          const arcToCenter = `A0,0,0,0,0,${PIE_CENTER_X},${PIE_CENTER_Y}`;
          const percentage = (valuePercentage * 100);
          return {
            color: this._getColor(index),
            key: item.key,
            path: `${moveCenter}
            ${drawFirstLine}
            ${drawFirstArc}
            ${lineToCenter}
            ${arcToCenter}`,
            percentage,
            text: textCartesian,
            title: `${item.label} ${percentage.toFixed(2)} %`,
          };
        });
      }
      return [];
    },
    titleYPos () {
      return TITLE_Y_POS;
    },
    labelXPos () {
      return LABEL_X_POS;
    },
    labelTextXPos () {
      return LABEL_X_TEXT_POS;
    },
  },
};
