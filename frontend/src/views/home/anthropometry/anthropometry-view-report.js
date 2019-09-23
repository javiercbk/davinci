import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import AnthropometryService from '../../../services/anthropometry/anthropometry-service';
import SportService from '../../../services/sport/sport-service';
import { emptyAnthropometry, isAnthropometryCompleted } from '../../../lib/anthropometry';
import AnthropometryReport from '../../../components/anthropometry/reports/anthropometry-report.vue';
import LoadingAnimation from '../../../components/loading/loading-animation.vue';

const anthropometryService = new AnthropometryService();
const sportService = new SportService();

const buildErrorMessage = ($t, $tc, entity, response) => {
  let message;
  const entityName = $tc(`entities.${entity}`, 1).toLowerCase();
  if (response.status >= 500) {
    message = $t('errors.entity.message', {
      entity: entityName
    });
  } else {
    message = $t('errors.comparison.notAllowed', {
      entity: entityName
    });
  }
  return message;
};

export default {
  components: {
    AnthropometryReport,
    LoadingAnimation
  },
  props: {
    entityId: {
      type: String,
      required: true
    },
    compareId: {
      type: String
    }
  },
  data () {
    return {
      loading: true,
      loadingPatientsAnthropometry: false,
      anthropometry: emptyAnthropometry(),
      comparison: null,
      comparisonAnthropometry: emptyAnthropometry(),
      pastAnthropometries: []
    };
  },
  watch: {
    entityId: {
      immediate: true,
      handler (anthropometryId) {
        this.loading = true;
        const currAnthId = _.get(this.anthropometry, '_id');
        const currPatId = _.get(this.anthropometry, 'patient._id');
        if (anthropometryId !== currAnthId) {
          anthropometryService
            .retrieve(anthropometryId)
            .then((response) => {
              this.anthropometry = _.get(response, 'data.data.anthropometry');
              const patientId = _.get(this.anthropometry, 'patient._id');
              if (patientId && patientId !== currPatId) {
                this.retrievePatientAnthropometries(patientId);
              }
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }
    },
    compareId: {
      immediate: true,
      handler (compareId) {
        if (compareId) {
          this.loadingComparison = true;
          const [entity, id] = compareId.split(':');
          if (entity === 'anth') {
            anthropometryService
              .retrieve(id)
              .then((response) => {
                this.comparisonAnthropometry = _.get(response, 'data.data.anthropometry');
              })
              .catch((response) => {
                this.pushNotification({
                  title: this.$t('errors.title'),
                  message: buildErrorMessage(this.$t, this.$tc, 'anthropometry', response),
                  variant: 'danger'
                });
              })
              .finally(() => {
                this.loadingComparison = false;
              });
          } else if (entity === 'sport') {
            sportService
              .retrieve(id)
              .then((response) => {
                this.comparisonAnthropometry = _.get(response, 'data.data.sport');
              })
              .catch((response) => {
                this.pushNotification({
                  title: this.$t('errors.title'),
                  message: buildErrorMessage(this.$t, this.$tc, 'sport', response),
                  variant: 'danger'
                });
              })
              .finally(() => {
                this.loadingComparison = false;
              });
          } else {
            this.loadingComparison = false;
            this.pushNotification({
              title: this.$t('errors.title'),
              message: this.$t('errors.comparison.badPrefix', {
                prefix: entity
              }),
              variant: 'danger'
            });
          }
        }
      }
    },
    comparison (newComparison) {
      if (newComparison) {
        this.$router.push({
          name: 'anthropometry-report-compare',
          params: {
            compareId: newComparison
          }
        });
      } else {
        this.$router.push({
          name: 'anthropometry-report',
          params: {
            entityId: this.entityId
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters('session', ['user']),
    comparisonOrNull () {
      if (_.get(this.comparisonAnthropometry, '_id')) {
        return this.comparisonAnthropometry;
      }
      return null;
    },
    comparisonOptions () {
      const options = [{ value: null, text: this.$t('comparison.none') }];
      const patientSports = _.get(this, 'anthropometry.patient.sports', []);
      _.forEach(this.pastAnthropometries, (pastAnth) => {
        if (pastAnth._id !== this.entityId) {
          const clientTime = moment.utc(pastAnth.measurementDate).local();
          options.push({
            value: `anth:${pastAnth._id}`,
            text: clientTime.format(this.user.dateFormat)
          });
        }
      });
      _.forEach(patientSports, (sport) => {
        // FIXME: provider a better way to i18n sports
        options.push({ value: `sport:${sport._id}`, text: this.$t(`sports["${sport.name}"]`) });
      });
      return options;
    },
    editAnthropometryRoute () {
      let route = null;
      if (this.anthropometry && this.anthropometry._id) {
        route = {
          name: 'anthropometries-edit',
          params: {
            entityId: this.anthropometry._id
          }
        };
      }
      return route;
    },
    isAnthropometryCompleted () {
      if (this.anthropometry) {
        return isAnthropometryCompleted(this.anthropometry);
      }
      return false;
    }
  },
  methods: {
    ...mapActions('notifications', ['pushNotification']),
    retrievePatientAnthropometries (patientId) {
      this.loadingPatientsAnthropometry = true;
      anthropometryService
        .search({
          patient: patientId,
          fields: ['_id', 'measurementDate', 'patient.name', 'patient.gender']
        })
        .then((response) => {
          this.pastAnthropometries = _.get(response, 'data.data.anthropometries');
        })
        .finally(() => {
          this.loadingPatientsAnthropometry = false;
        });
    }
  }
};
