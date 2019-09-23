import _ from 'lodash';
import diagramMixin from '../diagram-mixin';

const LABEL_TEXT_OFFSET = 5;
const LABEL_X_POS = 600;
const LABEL_X_TEXT_POS = LABEL_X_POS + 20;
const TITLE_Y_POS = 20;
const PLOT_START_X = 0;
const PLOT_END_X = 570;
const PLOT_SPACE_X = PLOT_END_X - PLOT_START_X;
const PLOT_START_Y = 0;
const PLOT_END_Y = 370;
const PLOT_SPACE_Y = PLOT_END_Y - PLOT_START_Y;

export default {
  mixins: [diagramMixin],
  props: {
    title: {
      type: String,
      default: () => '',
    },
    distancefromZero: {
      type: Number,
      default: 4,
    },
    xAxisColor: {
      type: String,
      default: '#000000',
    },
    yAxisColor: {
      type: String,
      default: '#000000',
    },
    xAxisName: {
      type: String,
      default: '',
    },
    yAxisName: {
      type: String,
      default: '',
    },
  },
  computed: {
    total () {
      return this.value.length;
    },
    plotDataYPos () {
      const len = this.value.length;
      // len + 1 to give an extra space for padding top and bottom
      const offsetY = PLOT_SPACE_Y / (len + 1);
      return _.map(this.value, (v, index) => PLOT_START_Y + ((offsetY) * (index + 1)));
    },
    labels () {
      if (this.total > 0) {
        return _.map(this.value, (item, index) => ({
          color: this._getColor(index),
          label: item.label,
          y: this.plotDataYPos[index],
          textY: this.plotDataYPos[index] + LABEL_TEXT_OFFSET,
          key: item.key,
        }));
      }
      return [];
    },
    dots () {
      return _.map(this.value, (v, index) => ({
        y: this.plotDataYPos[index],
        color: this._getColor(index),
        position: this.xValueLinealFunc(v.value),
        title: `${v.label}: ${v.value ? v.value.toFixed(2) : ''}`,
      }));
    },
    yDashedLines () {
      return _.map(this.dots, d => d.y);
    },
    xLabels () {
      const len = Math.abs(this.distancefromZero) * 2;
      const min = (-Math.abs(this.distancefromZero));
      const offsetX = PLOT_SPACE_X / len;
      const xLabels = [];
      let j = min;
      for (let i = 0; i <= len; i++) {
        xLabels.push({
          position: (offsetX * i),
          value: j,
        });
        j++;
      }
      return xLabels;
    },
    zeroXLabel () {
      const len = this.xLabels.length;
      return this.xLabels[len / 2];
    },
    labelXPos () {
      return LABEL_X_POS;
    },
    labelTextXPos () {
      return LABEL_X_TEXT_POS;
    },
    plotStartX () {
      return PLOT_START_X;
    },
    plotEndX () {
      return PLOT_END_X;
    },
    titleYPos () {
      return TITLE_Y_POS;
    },
    xValueLinealFunc () {
      if (this.xLabels.length > 0) {
        const firstLabel = this.xLabels[0];
        const secondLabel = this.xLabels[1];
        const firstPosition = firstLabel.position;
        const firstValue = firstLabel.value;
        const secondPosition = secondLabel.position;
        const secondValue = secondLabel.value;
        // eslint-disable-next-line max-len
        return x => (((secondPosition - firstPosition) / (secondValue - firstValue)) * (x - firstValue)) + firstPosition;
      }
      return () => -10;
    },
  },
};
