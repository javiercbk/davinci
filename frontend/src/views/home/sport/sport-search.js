import _ from 'lodash';
import SportSearchForm from '../../../components/sport/sport-search-form.vue';
import SportList from '../../../components/sport/sport-list.vue';
import SportService from '../../../services/sport/sport-service';

const sportService = new SportService();

export default {
  components: {
    SportList,
    SportSearchForm
  },
  props: {
    compare: {
      type: String
    }
  },
  data () {
    return {
      sports: [],
      sportSearchTerm: {
        name: '',
        position: '',
        gender: ''
      },
      loading: false
    };
  },
  computed: {
    isComparing () {
      return !!_.get(this.comparing, 'measurementDate');
    }
  },
  methods: {
    onSportSearch (searchTerm) {
      this.loading = true;
      this.sportSearchTerm = searchTerm;
      const termWithFields = Object.assign({}, searchTerm, {
        fields: '_id,name,position,gender'
      });
      sportService
        .search(termWithFields)
        .then((response) => {
          this.sports = _.get(response, 'data.data.sports');
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
