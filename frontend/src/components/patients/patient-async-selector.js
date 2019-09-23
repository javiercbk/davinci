import _ from 'lodash';
import Multiselect from 'vue-multiselect';
import PatientService from '../../services/patient/patient-service';

const patientService = new PatientService();

const CUSTOM_PROPS = ['internalSearch', 'internal-search', 'placeholder', 'multiple', 'loading'];
const CUSTOM_LISTENERS = ['searchChange', 'search-change'];

export default {
  components: {
    Multiselect
  },
  props: {
    ..._.omit(Multiselect.props, CUSTOM_PROPS)
  },
  created () {
    this.onSearchChange('');
  },
  data () {
    return {
      patientsFound: [],
      patientsLoading: false
    };
  },
  computed: {
    wrappedListeners () {
      return _.omit(this.$listeners, CUSTOM_LISTENERS);
    }
  },
  methods: {
    onSearchChange (searchTerm) {
      const term = _.trim(searchTerm);
      this.patientsLoading = true;
      patientService
        .search({
          term,
          limit: 10
        })
        .then((response) => {
          this.patientsFound = _.get(response, 'data.data.patients');
        })
        .finally(() => {
          this.patientsLoading = false;
        });
      this.$emit('search-change', searchTerm);
    },
    fullName (patient) {
      let name = _.trim(`${_.get(patient, 'firstName', '')} ${_.get(patient, 'lastName', '')}`);
      if (patient.personalId) {
        name = `${name} (${patient.personalId})`;
      }
      return name;
    }
  }
};
