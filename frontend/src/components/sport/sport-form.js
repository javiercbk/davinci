import _ from 'lodash';
import { minLength, maxLength, required } from 'vuelidate/lib/validators';
import AnthropometryRawForm from '../anthropometry/anthropometry-raw-form.vue';
import FormSave from '../form/form-save.vue';
import SportService from '../../services/sport/sport-service';
import { emptySport } from '../../lib/sport';

const sportService = new SportService();

export default {
  components: {
    AnthropometryRawForm,
    FormSave
  },
  props: {
    sportId: {
      type: String,
      default: ''
    }
  },
  beforeCreate () {
    this.$options.provide = () => ({ $v: this.$v });
  },
  created () {
    // only reatrieve that IF there is no anthropometry loaded.
    // when creating a new anthropometry the URL will change
    // but the component won't be re-created
    if (this.sportId && !this.sport._id) {
      this.loading = true;
      this.firstLoad = true;
      sportService
        .retrieve(this.sportId)
        .then((response) => {
          this.sport = _.get(response, 'data.data.sport');
          this.$emit('sport-loaded', this.sport);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  data () {
    return {
      saving: false,
      loading: false,
      firstLoad: false,
      sport: emptySport()
    };
  },
  validations: {
    sport: {
      name: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(250)
      },
      position: {
        minLength: minLength(1),
        maxLength: maxLength(250)
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
      // TODO: Add anthropometry metrics validation
    }
  },
  computed: {
    genderOptions () {
      return [
        { text: this.$t('patients.gender.male'), value: 'M' },
        { text: this.$t('patients.gender.female'), value: 'F' }
      ];
    }
  },
  methods: {
    onSubmit () {
      if (!this.saving && this.$v.valid) {
        this.saving = true;
        this._save();
      }
    },
    _save () {
      const sport = _.cloneDeep(this.sport);
      sportService
        .save(sport)
        .then((response) => {
          if (!this.sport._id) {
            const newSportId = _.get(response, 'data.data.sport._id');
            this.sport._id = newSportId;
            this.$router.replace({
              name: 'sports-edit',
              params: {
                entityId: newSportId
              }
            });
          }
        })
        .finally(() => {
          this.saving = false;
        });
    }
  }
};
