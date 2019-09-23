import _ from 'lodash';
import AnthropometryRawForm from './anthropometry-raw-form.vue';
import AnthropometryService from '../../services/anthropometry/anthropometry-service';
import { emptyAnthropometry } from '../../lib/anthropometry';

const anthropometryService = new AnthropometryService();

export default {
  components: {
    AnthropometryRawForm
  },
  props: {
    anthropometryId: {
      type: String,
      default: ''
    },
    patient: {
      type: Object,
      default: () => ({
        _id: null
      })
    }
  },
  created () {
    // only reatrieve that IF there is no anthropometry loaded.
    // when creating a new anthropometry the URL will change
    // but the component won't be re-created
    if (this.anthropometryId && !this.anthropometry._id) {
      this.loading = true;
      this.firstLoad = true;
      anthropometryService
        .retrieve(this.anthropometryId)
        .then((response) => {
          this.anthropometry = _.get(response, 'data.data.anthropometry');
          this.$emit('anthropometry-loaded', this.anthropometry);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  data () {
    return {
      saving: false,
      loading: false,
      timeoutId: null,
      firstLoad: false,
      // duplicated patient to not trigger a save when ONLY selecting a patient
      anthropometry: emptyAnthropometry()
    };
  },
  computed: {
    patientId () {
      return _.get(this.patient, '_id', null);
    },
    saveMessage () {
      let message = 'form.editEntity';
      if (this.$router.currentRoute.name === 'anthropometries-create') {
        message = 'form.createNewEntity';
      }
      return this.$t(message, {
        entity: this.$tc('entities.anthropometry', 1).toLowerCase()
      });
    }
  },
  watch: {
    patientId (newValue) {
      // if anthropometry already exist then set the value to trigger a sync
      if (this.anthropometry._id) {
        this.$set(this.anthropometry, 'patient', newValue);
      }
    },
    anthropometry: {
      deep: true,
      handler () {
        if (this.patientId && this.anthropometry.patient !== this.patientId) {
          // if patient has not been assigned yet, then assign it and let the watcher re-execute
          this.anthropometry.patient = this.patientId;
        } else if (!this.firstLoad) {
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
          this.timeoutId = setTimeout(() => {
            this.timeoutId = null;
            this.save();
          }, this.syncDelay);
        } else {
          this.firstLoad = false;
        }
      }
    }
  },
  methods: {
    save () {
      const anthropometry = {};
      _.forEach(_.keys(this.anthropometry), (key) => {
        anthropometry[key] = this.anthropometry[key];
      });
      anthropometry.patient = { _id: this.patientId };
      if (!this.saving) {
        this.saving = true;
        anthropometryService
          .save(anthropometry)
          .then((response) => {
            if (!this.anthropometry._id) {
              const newAnthropometryId = _.get(response, 'data.data.anthropometry._id');
              this.anthropometry._id = newAnthropometryId;
              this.$router.replace({
                name: 'anthropometries-edit',
                params: {
                  entityId: newAnthropometryId
                }
              });
            }
          })
          .finally(() => {
            this.saving = false;
          });
      }
    }
  }
};
