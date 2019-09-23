import UtcFlatpickr from '../form/utc-flatpickr.vue';

export default {
  components: {
    UtcFlatpickr
  },
  data () {
    return {
      name: '',
      position: '',
      gender: ''
    };
  },
  computed: {
    genderOptions () {
      return [
        { text: this.$t('patients.gender.male'), value: 'M' },
        { text: this.$t('patients.gender.female'), value: 'F' },
        { text: this.$t('form.all'), value: '' }
      ];
    },
    sportSearchTerm () {
      const searchTerm = {};
      let hasSearchTerms = false;
      if (this.name) {
        searchTerm.name = this.name;
        hasSearchTerms = true;
      }
      if (this.position) {
        searchTerm.position = this.position;
        hasSearchTerms = true;
      }
      if (this.gender) {
        searchTerm.gender = this.gender;
        hasSearchTerms = true;
      }
      if (!hasSearchTerms) {
        return null;
      }
      return searchTerm;
    }
  },
  methods: {
    createNew () {
      this.$router.push({
        name: 'sports-create'
      });
    },
    onSearchChange (searchTerm) {
      this.patientSearchTerm = searchTerm;
    },
    search () {
      this.$emit('sport-search', this.sportSearchTerm);
    }
  }
};
