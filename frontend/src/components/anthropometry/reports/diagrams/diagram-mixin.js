const DEFAULT_COLORS = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC',
];

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    chartLabel: {
      type: String,
      default: () => 'Pie chart',
    },
    colors: {
      type: Array,
      default: () => DEFAULT_COLORS,
    },
    title: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    _getColor (index) {
      const len = this.colors.length;
      if (len > index) {
        return this.colors[index];
      }
      const colorIndex = index - Math.floor(index / len);
      return this.colors[colorIndex];
    },
  },
};
