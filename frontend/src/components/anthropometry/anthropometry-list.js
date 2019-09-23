import _ from 'lodash';
import moment from 'moment';

export default {
  props: {
    searchTerm: {
      type: Object,
      default: () => ({
        from: null,
        to: null
      })
    },
    anthropometries: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    anthropometryFields () {
      return [
        {
          key: 'measurementDate',
          formatter (measurementDate) {
            return moment
              .utc(measurementDate)
              .local()
              .format('YYYY-MM-DD HH:mm');
          },
          label: this.$t('form.date'),
          sortable: true
        },
        {
          key: 'patient',
          formatter (patient) {
            if (patient) {
              const patientNames = [patient.firstName, patient.lastName];
              const patientName = patientNames.join(' ');
              if (patient.personalId) {
                return `${patientName} (${patient.personalId})`;
              }
              return patientName;
            }
            return '';
          },
          label: this.$tc('entities.patient', 1),
          sortable: false
        },
        {
          key: 'actions',
          label: this.$t('form.actions'),
          sortable: false
        }
      ];
    },
    isSearchEmpty () {
      return !this.searchTerm || (!this.searchTerm.from && !this.searchTerm.to);
    },
    searchTermStr () {
      const i18nMessageParams = {
        from: _.get(this.searchTerm, 'from'),
        to: _.get(this.searchTerm, 'to')
      };
      return this.$t('anthropometries.searchTermAsString', i18nMessageParams);
    }
  },
  methods: {
    navigateAnthropometry (anthropometry) {
      this.$router.push({
        name: 'anthropometries-edit',
        params: {
          entityId: anthropometry._id
        }
      });
    },
    selectAnthropometryForComparison (anthropometry) {
      this.$emit('anthropometry-select-compare', anthropometry._id);
    },
    deleteAnthropometry (anthropometry) {
      // TODO display modal and upon confirmation delete.
      // eslint-disable-next-line
      console.log(`attempted to delete anthropometry ${anthropometry._id}`);
    }
  }
};
