import _ from 'lodash';
import ComparisonIcon from './comparison-icon.vue';
import MassRow from './mass-row.vue';
import MeasurementGroup from './measurement-group.vue';
import PieChart from './diagrams/chart/pie-chart.vue';
import SomatocardDiagram from './diagrams/somatocard/somatocard-diagram.vue';
import VerticalIndependentPlot from './diagrams/plot/vertical-independent-plot.vue';
import WaistHipTable from './waist-hip-table.vue';
import {
  anthropometryMasses,
  anthropometryMedians,
  anthropometryScoreZ,
  basalMetabolicRate,
  estimatedTotalEnergyExpenditure,
  idealWeight,
  somatotype,
  GROUPED_MASSES
} from '../../../lib/anthropometry/anthropometry';

const SCORE_Z_MASSES = _.filter(GROUPED_MASSES, m => m !== 'skin');

const somatotypeCoords = st => ({
  x: st.ecto - st.endo,
  y: 2 * st.meso - (st.ecto + st.endo)
});

// eslint-disable-next-line max-len
const generateComparison = (measurements, comparisonMedians, comparisonScoresZ) => ({
  name: measurements.name,
  measurements: _.map(measurements.measurements, (m) => {
    const comparison = _.cloneDeep(m);
    comparison.value = _.get(comparisonMedians, comparison.key);
    comparison.scoresZ = _.get(comparisonScoresZ, comparison.key);
    return comparison;
  })
});

const generateScoreZPlotData = ($t, masses, scoresZ) => {
  let data = [];
  if (masses) {
    data = _.map(SCORE_Z_MASSES, key => ({
      label: $t(`anthropometries.masses.${key}`),
      key,
      value: masses.scoresZ[key]
    }));
  }
  if (scoresZ) {
    data = [
      {
        label: $t('anthropometries.measurements.bodyMass'),
        key: 'bodyMass',
        value: scoresZ.bodyMass
      }
    ].concat(data);
  }
  return data;
};

const generateScoreZGroupedPlotData = measurements => _.map(measurements, m => ({
  label: m.name,
  key: m.key,
  value: m.scoreZ
}));

const generateSomatocardData = ($t, somatotypeData, idealSomatotype, pastSomatotypes) => {
  const currentCoords = somatotypeCoords(somatotypeData);
  const data = {
    current: {
      label: $t('anthropometries.currentMeasurement'),
      values: {
        x: currentCoords.x,
        y: currentCoords.y
      }
    }
  };
  if (idealSomatotype) {
    const idealCoords = somatotypeCoords(idealSomatotype);
    data.ideal = {
      label: $t('anthropometries.idealMeasurement'),
      values: {
        x: idealCoords.x,
        y: idealCoords.y
      }
    };
  }
  if (pastSomatotypes && pastSomatotypes.length > 0) {
    const values = _.map(pastSomatotypes, st => somatotypeCoords(st));
    data.past = {
      label: $t('anthropometries.pastMeasurement'),
      values
    };
  }
  return data;
};

export default {
  components: {
    ComparisonIcon,
    MassRow,
    MeasurementGroup,
    PieChart,
    SomatocardDiagram,
    VerticalIndependentPlot,
    WaistHipTable
  },
  props: {
    anthropometry: {
      type: Object,
      required: true
    },
    comparisonAnthropometry: {
      type: Object
    }
  },
  computed: {
    hasComparison () {
      return !!this.comparisonAnthropometry;
    },
    idealAnthropometryMedians () {
      return null;
    },
    idealSomatotype () {
      return null;
    },
    pastSomatotypes () {
      return [];
    },
    mesomorphicLabel () {
      return this.$t('anthropometries.somatotypes.mesomorphic');
    },
    endomorphicLabel () {
      return this.$t('anthropometries.somatotypes.endomorphic');
    },
    ectomorphicLabel () {
      return this.$t('anthropometries.somatotypes.ectomorphic');
    },
    // measurements
    medians () {
      return anthropometryMedians(this.anthropometry);
    },
    comparisonMedians () {
      if (this.comparisonAnthropometry) {
        return anthropometryMedians(this.comparisonAnthropometry);
      }
      return null;
    },
    scoresZ () {
      return anthropometryScoreZ(this.medians);
    },
    comparisonScoresZ () {
      if (this.comparisonMedians) {
        return anthropometryScoreZ(this.comparisonMedians);
      }
      return null;
    },
    patient () {
      return _.get(this.anthropometry, 'patient');
    },
    comparisonPatient () {
      return _.get(this.comparisonAnthropometry, 'patient');
    },
    masses () {
      return anthropometryMasses(this.medians, this.patient);
    },
    comparisonMasses () {
      if (this.hasComparison) {
        return anthropometryMasses(this.comparisonMedians, this.comparisonPatient);
      }
      return null;
    },
    bmr () {
      const bmr = basalMetabolicRate(this.medians);
      if (bmr) {
        return bmr;
      }
      return '';
    },
    comparisonBmr () {
      if (this.hasComparison) {
        const bmr = basalMetabolicRate(this.comparisonMedians);
        if (bmr) {
          return bmr;
        }
        return '';
      }
      return null;
    },
    etee () {
      const etee = estimatedTotalEnergyExpenditure(this.medians);
      if (etee) {
        return etee;
      }
      return '';
    },
    comparisonEtee () {
      if (this.hasComparison) {
        const etee = estimatedTotalEnergyExpenditure(this.comparisonMedians);
        if (etee) {
          return etee;
        }
        return '';
      }
      return null;
    },
    iWeight () {
      const iwg = idealWeight(this.medians);
      if (iwg) {
        return iwg;
      }
      return '';
    },
    comparisonIWeight () {
      if (this.hasComparison) {
        const iwg = idealWeight(this.comparisonMedians);
        if (iwg) {
          return iwg;
        }
        return '';
      }
      return null;
    },
    iWeightRange () {
      const iwgRange = {
        min: '',
        max: ''
      };
      if (this.iWeight) {
        const tenth = this.iWeight / 10;
        iwgRange.min = this.iWeight - tenth;
        iwgRange.max = this.iWeight + tenth;
      }
      return iwgRange;
    },
    comparisonIWeightRange () {
      if (this.hasComparison) {
        const iwgRange = {
          min: '',
          max: ''
        };
        if (this.comparisonIWeight) {
          const tenth = this.comparisonIWeight / 10;
          iwgRange.min = this.comparisonIWeight - tenth;
          iwgRange.max = this.comparisonIWeight + tenth;
        }
        return iwgRange;
      }
      return null;
    },
    massesPercentageData () {
      if (this.masses) {
        return _.map(GROUPED_MASSES, key => ({
          label: this.$t(`anthropometries.masses.${key}`),
          key,
          value: this.masses[key]
        }));
      }
      return [];
    },
    comparisonMassesPercentageData () {
      if (this.hasComparison) {
        return _.map(this.massesPercentageData, (m) => {
          const cm = _.cloneDeep(m);
          cm.value = this.comparisonMasses[m.key];
          return cm;
        });
      }
      return null;
    },
    scoreZPlotData () {
      return generateScoreZPlotData(this.$t.bind(this), this.masses, this.scoresZ);
    },
    comparisonScoreZPlotData () {
      if (this.hasComparison) {
        return generateScoreZPlotData(
          this.$t.bind(this),
          this.comparisonMasses,
          this.comparisonScoresZ
        );
      }
      return null;
    },
    // plot
    basicScoreZPlotData () {
      if (this.scoresZ) {
        return [
          {
            label: this.$t('anthropometries.measurements.bodyMass'),
            key: 'bodyMass',
            value: this.scoresZ.bodyMass
          },
          {
            label: this.$t('anthropometries.measurements.sittingHeight'),
            key: 'sittingHeight',
            value: this.scoresZ.sittingHeight
          }
        ];
      }
      return [];
    },
    comparisonBasicScoreZPlotData () {
      if (this.hasComparison) {
        return _.map(this.basicScoreZPlotData, (plotData) => {
          const comparisonPlotData = _.cloneDeep(plotData);
          comparisonPlotData.value = this.comparisonScoresZ[plotData.key];
          return comparisonPlotData;
        });
      }
      return null;
    },
    diameterScoreZPlotData () {
      if (this.scoresZ) {
        return generateScoreZGroupedPlotData(this.diameterMeasurements.measurements);
      }
      return [];
    },
    comparisonDiameterScoreZPlotData () {
      if (this.hasComparison && this.comparisonScoresZ) {
        return generateScoreZGroupedPlotData(this.comparisonDiameterMeasurements.measurements);
      }
      return null;
    },
    perimetersScoreZPlotData () {
      if (this.scoresZ) {
        return generateScoreZGroupedPlotData(this.perimeterMeasurements.measurements);
      }
      return [];
    },
    comparisonPerimetersScoreZPlotData () {
      if (this.hasComparison && this.comparisonScoresZ) {
        return generateScoreZGroupedPlotData(this.comparisonPerimeterMeasurements.measurements);
      }
      return null;
    },
    skinFoldsscoreZPlotData () {
      if (this.scoresZ) {
        return generateScoreZGroupedPlotData(this.skinFoldMeasurements.measurements);
      }
      return [];
    },
    comparisonSkinFoldsscoreZPlotData () {
      if (this.hasComparison && this.comparisonScoresZ) {
        return generateScoreZGroupedPlotData(this.comparisonSkinFoldMeasurements.measurements);
      }
      return null;
    },
    // somatocard
    somatocardData () {
      return generateSomatocardData(
        this.$t.bind(this),
        this.somatotype,
        this.idealSomatotype,
        this.pastSomatotypes
      );
    },
    comparisonSomatocardData () {
      if (this.hasComparison) {
        return generateSomatocardData(
          this.$t.bind(this),
          this.comparisonSomatotype,
          this.comparisonIdealSomatotype,
          this.comparisonPastSomatotypes
        );
      }
      return null;
    },
    somatocardLabels () {
      return {
        top: this.$t('anthropometries.ectomorphic'),
        left: this.$t('anthropometries.mesomorphic'),
        right: this.$t('anthropometries.endomorphic')
      };
    },
    somatotype () {
      if (this.medians) {
        return somatotype(this.medians);
      }
      return {
        ecto: 0,
        meso: 0,
        endo: 0
      };
    },
    comparisonSomatotype () {
      if (this.hasComparison && this.comparisonMedians) {
        return somatotype(this.comparisonMedians);
      }
      return null;
    },
    // groups
    measurementGroups () {
      return [
        this.basicMeasurements,
        this.diameterMeasurements,
        this.perimeterMeasurements,
        this.skinFoldMeasurements
      ];
    },

    comparisonGroups () {
      if (this.hasComparison) {
        return [
          this.comparisonBasicMeasurements,
          this.comparisonDiameterMeasurements,
          this.comparisonPerimeterMeasurements,
          this.comparisonSkinFoldMeasurements
        ];
      }
      // if not comparison return empty objects
      return this.measurementGroups.map(() => ({}));
    },
    basicMeasurements () {
      return {
        name: this.$t('anthropometries.measurements.groups.basic'),
        measurements: [
          {
            name: this.$t('anthropometries.measurements.bodyMass'),
            key: 'bodyMass',
            value: this.medians.bodyMass,
            scoreZ: this.scoresZ.bodyMass,
            unit: 'kg'
          },
          {
            name: this.$t('anthropometries.measurements.stature'),
            key: 'stature',
            value: this.medians.stature,
            // scoreZ for stature is allways null
            scoreZ: this.scoresZ.stature,
            unit: 'kg'
          },
          {
            name: this.$t('anthropometries.measurements.sittingHeight'),
            key: 'sittingHeight',
            value: this.medians.sittingHeight,
            scoreZ: this.scoresZ.sittingHeight,
            unit: 'kg'
          }
        ]
      };
    },
    comparisonBasicMeasurements () {
      return generateComparison(
        this.basicMeasurements,
        this.comparisonMedians,
        this.comparisonScoresZ
      );
    },
    diameterMeasurements () {
      return {
        name: this.$t('anthropometries.measurements.groups.diameter'),
        measurements: [
          {
            name: this.$t('anthropometries.measurements.biacromial'),
            key: 'biacromial',
            value: this.medians.biacromial,
            scoreZ: this.scoresZ.biacromial,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.transverseChest'),
            key: 'transverseChest',
            value: this.medians.transverseChest,
            scoreZ: this.scoresZ.transverseChest,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.anteriorPosteriorChestDepth'),
            key: 'anteriorPosteriorChestDepth',
            value: this.medians.anteriorPosteriorChestDepth,
            scoreZ: this.scoresZ.anteriorPosteriorChestDepth,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.biiliocristal'),
            key: 'biiliocristal',
            value: this.medians.biiliocristal,
            scoreZ: this.scoresZ.biiliocristal,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.humerusBiepicondylar'),
            key: 'humerusBiepicondylar',
            value: this.medians.humerusBiepicondylar,
            scoreZ: this.scoresZ.humerusBiepicondylar,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.femurBiepicondylar'),
            key: 'femurBiepicondylar',
            value: this.medians.femurBiepicondylar,
            scoreZ: this.scoresZ.femurBiepicondylar,
            unit: 'cm'
          }
        ]
      };
    },
    comparisonDiameterMeasurements () {
      return generateComparison(
        this.diameterMeasurements,
        this.comparisonMedians,
        this.comparisonScoresZ
      );
    },
    perimeterMeasurements () {
      return {
        name: this.$t('anthropometries.measurements.groups.perimeter'),
        measurements: [
          {
            name: this.$t('anthropometries.measurements.head'),
            key: 'head',
            value: this.medians.head,
            scoreZ: this.scoresZ.head,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.armRelaxed'),
            key: 'armRelaxed',
            value: this.medians.armRelaxed,
            scoreZ: this.scoresZ.armRelaxed,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.armFlexedTensed'),
            key: 'armFlexedTensed',
            value: this.medians.armFlexedTensed,
            scoreZ: this.scoresZ.armFlexedTensed,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.forearm'),
            key: 'forearm',
            value: this.medians.forearm,
            scoreZ: this.scoresZ.forearm,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.chest'),
            key: 'chest',
            value: this.medians.chest,
            scoreZ: this.scoresZ.chest,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.minWaist'),
            key: 'minWaist',
            value: this.medians.minWaist,
            scoreZ: this.scoresZ.minWaist,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.maxGlutealHip'),
            key: 'maxGlutealHip',
            value: this.medians.maxGlutealHip,
            scoreZ: this.scoresZ.maxGlutealHip,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.maxThighUpper'),
            key: 'maxThighUpper',
            value: this.medians.maxThighUpper,
            scoreZ: this.scoresZ.maxThighUpper,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.midThigh'),
            key: 'midThigh',
            value: this.medians.midThigh,
            scoreZ: this.scoresZ.midThigh,
            unit: 'cm'
          },
          {
            name: this.$t('anthropometries.measurements.maxCalf'),
            key: 'maxCalf',
            value: this.medians.maxCalf,
            scoreZ: this.scoresZ.maxCalf,
            unit: 'cm'
          }
        ]
      };
    },
    comparisonPerimeterMeasurements () {
      return generateComparison(
        this.perimeterMeasurements,
        this.comparisonMedians,
        this.comparisonScoresZ
      );
    },
    skinFoldMeasurements () {
      return {
        name: this.$t('anthropometries.measurements.groups.skinFold'),
        measurements: [
          {
            name: this.$t('anthropometries.measurements.triceps'),
            key: 'triceps',
            value: this.medians.triceps,
            scoreZ: this.scoresZ.triceps,
            unit: 'mm'
          },
          {
            name: this.$t('anthropometries.measurements.subscapular'),
            key: 'subscapular',
            value: this.medians.subscapular,
            scoreZ: this.scoresZ.subscapular,
            unit: 'mm'
          },
          {
            name: this.$t('anthropometries.measurements.supraspinal'),
            key: 'supraspinal',
            value: this.medians.supraspinal,
            scoreZ: this.scoresZ.supraspinal,
            unit: 'mm'
          },
          {
            name: this.$t('anthropometries.measurements.abdominal'),
            key: 'abdominal',
            value: this.medians.abdominal,
            scoreZ: this.scoresZ.abdominal,
            unit: 'mm'
          },
          {
            name: this.$t('anthropometries.measurements.frontThigh'),
            key: 'frontThigh',
            value: this.medians.frontThigh,
            scoreZ: this.scoresZ.frontThigh,
            unit: 'mm'
          },
          {
            name: this.$t('anthropometries.measurements.medialCalf'),
            key: 'medialCalf',
            value: this.medians.medialCalf,
            scoreZ: this.scoresZ.medialCalf,
            unit: 'mm'
          }
        ]
      };
    },
    comparisonSkinFoldMeasurements () {
      return generateComparison(
        this.skinFoldMeasurements,
        this.comparisonMedians,
        this.comparisonScoresZ
      );
    },
    massesData () {
      const hc = this.hasComparison;
      return _.map(GROUPED_MASSES, (m) => {
        const data = {
          key: m,
          name: this.$t(`anthropometries.masses.${m}`),
          percentage: this.masses.percentages[m],
          adjusted: this.masses.adjusted[m],
          scoreZ: this.masses.scoresZ[m]
        };
        if (hc) {
          data.comparison = {
            percentage: this.comparisonMasses.percentages[m],
            adjusted: this.comparisonMasses.adjusted[m],
            scoreZ: this.comparisonMasses.scoresZ[m]
          };
        }
        return data;
      });
    }
  }
};
