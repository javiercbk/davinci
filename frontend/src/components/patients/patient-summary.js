import _ from 'lodash';
import { faCog, faSpinner } from '@fortawesome/free-solid-svg-icons';
import PatientService from '../../services/patient/patient-service';

const patientService = new PatientService();

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      patient: {
        _id: null,
        firstName: null,
        lastName: null,
        personalId: null
      }
    };
  },
  watch: {
    value: {
      immediate: true,
      handler (newPatient, oldPatient) {
        const shouldRetrieveNew = newPatient
          && newPatient._id
          && newPatient.firstName === null
          && newPatient.lastName === null;
        const isOldEmpty = !oldPatient || !oldPatient._id;
        if (shouldRetrieveNew && isOldEmpty) {
          // patient has changed, retrieve the info about the patient
          this._retrievePatientInfo(newPatient);
        } else if (shouldRetrieveNew && !isOldEmpty) {
          const isDifferent = oldPatient._id !== newPatient._id;
          if (isDifferent) {
            this._retrievePatientInfo(newPatient);
          } else {
            // if new patient is not completed but it is the same _id as the current
            // then emit the old patient as input. This will trigger this handler again
            // but with a complete patient.
            this.$emit('input', oldPatient);
          }
        } else if (!shouldRetrieveNew) {
          this.patient = newPatient;
        }
      }
    }
  },
  computed: {
    icons () {
      return [faCog, faSpinner];
    },
    fullName () {
      if (this.patient) {
        return _.trim(`${this.patient.firstName} ${this.patient.lastName}`);
      }
      return '';
    }
  },
  methods: {
    _retrievePatientInfo (patient) {
      this.loading = true;
      patientService
        .retrieve(patient)
        .then((response) => {
          const patientFromServer = _.get(response, 'data.data.patient');
          this.patient = patientFromServer;
          this.$emit('input', patientFromServer);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
