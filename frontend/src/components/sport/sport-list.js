export default {
  props: {
    sports: {
      type: Array,
      default: () => []
    },
    searchTerm: {
      type: Object
    }
  },
  computed: {
    sportsFields () {
      return [
        {
          key: 'name',
          label: this.$t('form.name'),
          sortable: true
        },
        {
          key: 'position',
          label: this.$t('sports.position'),
          sortable: false
        },
        {
          key: 'gender',
          label: this.$t('patients.gender.default'),
          sortable: false
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
    navigateSport (sport) {
      this.$router.push({
        name: 'sports-edit',
        params: {
          entityId: sport._id
        }
      });
    },
    deleteSport (sport) {
      // TODO display modal and upon confirmation delete.
      // eslint-disable-next-line
      console.log(`attempted to delete anthropometry ${sport._id}`);
    }
  }
};
