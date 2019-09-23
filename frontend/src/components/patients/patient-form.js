import _ from 'lodash';
import { email, maxLength, required } from 'vuelidate/lib/validators';
import UtcFlatpickr from '../form/utc-flatpickr.vue';
import CountrySelector from '../form/country-selector.vue';
import PatientService from '../../services/patient/patient-service';
import { emptyPatient } from '../../lib/patient';
import { formFieldState } from '../../lib/form';

const patientService = new PatientService();

const PATIENT_PROPS = [
  '_id',
  'email',
  'birthDate',
  'countryOfOrigin',
  'firstName',
  'gender',
  'lastName',
  'personalId'
];

const componentState = () => _.assign(
  {},
  { patient: emptyPatient() },
  {
    firstLoad: false,
    loading: false,
    saving: false
  }
);

export default {
  components: {
    CountrySelector,
    UtcFlatpickr
  },
  props: {
    patientId: {
      type: String
    }
  },
  created () {
    // only reatrieve that IF there is no patient loaded.
    // when creating a new patient the URL will change
    // but the component won't be re-created
    if (this.patientId && !this.patient._id) {
      this.loading = true;
      this.firstLoad = true;
      patientService
        .retrieve({ _id: this.patientId })
        .then((response) => {
          this.patient = _.get(response, 'data.data.patient');
          this.$emit('patient-loaded', this.patient);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  data () {
    return componentState();
  },
  validations: {
    patient: {
      email: {
        required,
        email,
        maxLength: maxLength(150)
      },
      birthDate: {
        required
      },
      firstName: {
        required,
        maxLength: maxLength(150)
      },
      lastName: {
        required,
        maxLength: maxLength(150)
      },
      personalId: {
        maxLength: maxLength(256)
      },
      countryOfOrigin: {
        required
      },
      gender: {
        required,
        // eslint-disable-next-line func-names, object-shorthand
        enum: function (gender) {
          if (gender === '') {
            return true;
          }
          return gender === 'F' || gender === 'M';
        }
      }
    }
  },
  watch: {
    patient: {
      deep: true,
      handler (newPatient) {
        if (newPatient) {
          _.assign(this, emptyPatient(), newPatient);
        }
      }
    }
  },
  computed: {
    saveMessage () {
      let message = 'form.editEntity';
      if (this.$router.currentRoute.name === 'patients-create') {
        message = 'form.createNewEntity';
      }
      return this.$t(message, {
        entity: this.$tc('entities.patient', 1).toLowerCase()
      });
    },
    emailValidationState () {
      return formFieldState(this.$v.patient.email);
    },
    birthDateValidationState () {
      return formFieldState(this.$v.patient.birthDate);
    },
    firstNameValidationState () {
      return formFieldState(this.$v.patient.firstName);
    },
    lastNameValidationState () {
      return formFieldState(this.$v.patient.lastName);
    },
    personalIdValidationState () {
      return formFieldState(this.$v.patient.personalId);
    },
    countryOfOriginValidationState () {
      return formFieldState(this.$v.patient.countryOfOrigin);
    },
    genderValidationState () {
      return formFieldState(this.$v.patient.gender);
    }
  },
  methods: {
    createPatient () {
      this.formDirty = true;
      if (!this.$v.$invalid) {
        this.saving = true;
        patientService
          .save(this._patientData())
          .then((response) => {
            const reponseData = _.get(response, 'data.data.patient');
            this.patient._id = reponseData._id;
            this.$emit('patient-saved', this.patient);
            this.$router.replace({
              name: 'patients-edit',
              params: {
                entityId: this.patient._id
              }
            });
          })
          .finally(() => {
            this.saving = false;
          });
      }
    },
    _patientData () {
      const data = _.pick(this, PATIENT_PROPS);
      if (!data._id) {
        delete data._id;
      }
      return data;
    }
  }
};
