import _ from 'lodash';
import AnthropometryForm from '../../../components/anthropometry/anthropometry-form.vue';
import PatientForm from '../../../components/patients/patient-form.vue';
import PatientSearchCreate from '../../../components/patients/patient-search-create.vue';
import PatientSummary from '../../../components/patients/patient-summary.vue';
import { isAnthropometryCompleted } from '../../../lib/anthropometry';

const PATIENT_PROPS = ['_id', 'firstName', 'lastName'];

export default {
  components: {
    AnthropometryForm,
    PatientForm,
    PatientSearchCreate,
    PatientSummary
  },
  props: {
    entityId: {
      type: String
    }
  },
  data () {
    return {
      anthropometry: null,
      patientSelected: {
        _id: null,
        firstName: null,
        lastName: null,
        personalId: null
      },
      createNewPatient: false
    };
  },
  computed: {
    isAnthropometryCompleted () {
      if (this.anthropometry) {
        return isAnthropometryCompleted(this.anthropometry);
      }
      return false;
    },
    isPatientSelected () {
      return this.patientSelected._id;
    },
    reportRoute () {
      let route = {};
      if (this.anthropometry && this.anthropometry._id) {
        route = {
          name: 'anthropometry-report',
          params: {
            entityId: this.anthropometry._id
          }
        };
      }
      return route;
    }
  },
  methods: {
    onAnthropometryLoaded (anthropometryLoaded) {
      this.anthropometry = anthropometryLoaded;
      if (anthropometryLoaded.patient) {
        if (_.get(anthropometryLoaded, 'patient._id')) {
          this.patientSelected = anthropometryLoaded.patient;
        } else if (typeof anthropometryLoaded.patient === 'string') {
          this.patientSelected._id = anthropometryLoaded.patient;
        }
      }
    },
    onNewPatient () {
      this.createNewPatient = true;
    },
    onPatientSaved (newPatient) {
      this.patientSelected = _.pick(newPatient, PATIENT_PROPS);
      this.createNewPatient = false;
    },
    onPatientSelected (patientSelected) {
      this.patientSelected = patientSelected;
    },
    navigateReport () {
      if (this.reportRoute) {
        this.$router.push(this.reportRoute);
      }
    }
  }
};
