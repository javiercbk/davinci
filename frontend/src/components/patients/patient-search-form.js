export default {
  props: {
    isSearching: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      patientSearchTerm: ''
    };
  },
  methods: {
    createNew () {
      this.$router.push({
        name: 'patients-create'
      });
    },
    searchPatients () {
      this.$emit('patient-search', this.patientSearchTerm);
    }
  }
};
