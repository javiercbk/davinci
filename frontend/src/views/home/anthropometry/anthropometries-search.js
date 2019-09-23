import _ from 'lodash';
import AnthropometrySearchForm from '../../../components/anthropometry/anthropometry-search-form.vue';
import AnthropometryList from '../../../components/anthropometry/anthropometry-list.vue';
import AnthropometryService from '../../../services/anthropometry/anthropometry-service';

const anthropometryService = new AnthropometryService();

const emptyComparing = () => ({
  _id: null,
  patient: {
    firstName: null,
    lastName: null,
    personalId: null,
    gender: null
  },
  measurementDate: null
});

export default {
  components: {
    AnthropometryList,
    AnthropometrySearchForm
  },
  props: {
    compare: {
      type: String
    }
  },
  data () {
    return {
      anthropometries: [],
      comparing: emptyComparing(),
      anthropometrySearchTerm: {
        from: null,
        to: null
      },
      loading: false
    };
  },
  watch: {
    'comparing._id': {
      immediate: true,
      handler (val, old) {
        if (val) {
          if ((!old || val !== old) && this.comparing.measurementDate === null) {
            anthropometryService.retrieve(val).then((response) => {
              this.comparing = _.get(response, 'data.data.anthropometry', emptyComparing());
            });
          }
        } else {
          this.comparing = emptyComparing();
        }
      }
    }
  },
  computed: {
    isComparing () {
      return !!_.get(this.comparing, 'measurementDate');
    }
  },
  methods: {
    anthropometrySelectCompare (anthropometryId) {
      if (this.compare) {
        // second selection
        this.$router.push({
          name: 'anthropometries-search',
          params: {
            compare: anthropometryId
          }
        });
      } else {
        // first selection
        this.$router.push({
          name: 'anthropometries-edit',
          params: {
            entityId: this.compare,
            compare: anthropometryId
          }
        });
      }
    },
    onAnthropometrySearch (searchTerm) {
      this.loading = true;
      this.anthropometrySearchTerm = searchTerm;
      const termWithFields = Object.assign({}, searchTerm, {
        fields: '_id,measurementDate,errorPercent,patient'
      });
      anthropometryService
        .search(termWithFields)
        .then((response) => {
          this.anthropometries = _.get(response, 'data.data.anthropometries');
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
