import _ from 'lodash';
import { mapActions } from 'vuex';
import PatientSearchForm from '../../../components/patients/patient-search-form.vue';
import PatientList from '../../../components/patients/patient-list.vue';
import PatientService from '../../../services/patient/patient-service';

const patientService = new PatientService();

export default {
  components: {
    PatientList,
    PatientSearchForm
  },
  data () {
    return {
      searchTerm: '',
      searching: false,
      patients: []
    };
  },
  methods: {
    ...mapActions('notifications', ['pushNotification']),
    onPatientSearch (newTerm) {
      this.searchTerm = newTerm;
      this._searchPatients(newTerm);
    },
    _searchPatients (term) {
      this.searching = true;
      return patientService
        .search({ term })
        .then((response) => {
          const patientsFound = _.get(response, 'data.data.patients', []);
          this.patients = patientsFound;
        })
        .catch(() => {
          this.pushNotification({
            title: this.$t('errors.title'),
            message: this.$t('errors.entity.message', {
              entity: this.$tc('entities.patient', 2).toLowerCase()
            }),
            variant: 'danger'
          });
        })
        .finally(() => {
          this.searching = false;
        });
    }
  }
};
