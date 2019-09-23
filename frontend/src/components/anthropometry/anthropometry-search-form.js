import UtcFlatpickr from '../form/utc-flatpickr.vue';
import PatientAsyncSelector from '../patients/patient-async-selector.vue';

export default {
  components: {
    PatientAsyncSelector,
    UtcFlatpickr
  },
  data () {
    return {
      from: '',
      to: '',
      patient: '',
      patientSearchTerm: ''
    };
  },
  computed: {
    anthropometrySearchTerm () {
      const searchTerm = {};
      if (this.from) {
        searchTerm.from = this.from;
      }
      if (this.to) {
        searchTerm.to = this.to;
      }
      if (this.patient) {
        searchTerm.patient = this.patient;
      } else if (this.patientSearchTerm) {
        searchTerm.patientSearchTerm = this.patientSearchTerm;
      }
      return {
        from: this.from,
        to: this.to,
        patient: this.patient || this.patientSearchTerm
      };
    }
  },
  methods: {
    createNew () {
      this.$router.push({
        name: 'anthropometries-create'
      });
    },
    onSearchChange (searchTerm) {
      this.patientSearchTerm = searchTerm;
    },
    search () {
      this.$emit('anthropometry-search', this.anthropometrySearchTerm);
    }
  }
};
