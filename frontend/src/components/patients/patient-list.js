export default {
  props: {
    patients: {
      type: Array,
      default: () => []
    },
    searchTerm: {
      type: String
    }
  },
  computed: {
    patientsFields () {
      return [
        {
          key: 'lastName',
          label: this.$t('form.lastName'),
          sortable: true
        },
        {
          key: 'firstName',
          label: this.$t('form.firstName'),
          sortable: false
        },
        {
          key: 'email',
          label: this.$t('form.email'),
          sortable: true
        },
        {
          key: 'actions',
          label: this.$t('form.actions'),
          sortable: false
        }
      ];
    }
  },
  methods: {
    navigatePatient (patient) {
      this.$router.push({
        name: 'patients-edit',
        params: {
          entityId: patient._id
        }
      });
    },
    deletePatient () {
      // eslint-disable-next-line
      alert('not supported yet');
    }
  }
};
