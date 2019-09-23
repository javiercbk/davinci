import _ from 'lodash';
import { mapGetters } from 'vuex';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

import SportTranslation from './sport-translation.vue';
import SportService from '../../services/sport/sport-service';

const sportService = new SportService();

// eslint-disable-next-line func-names
const positionIfNecesary = function (value, vm) {
  if (value) {
    const position = _.get(vm, 'sport.position', '');
    const posLen = position.length;
    let validator = v => v.translationPosition.length === 0;
    if (posLen > 0) {
      validator = v => v.translationPosition.length > 0;
    }
    return _.every(value, validator);
  }
  return true;
};

export default {
  components: {
    SportTranslation
  },
  props: {
    sport: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      sportTranslations: []
    };
  },
  watch: {
    sportId: {
      immediate: true,
      handler (sportId) {
        if (sportId) {
          sportService.retrieveSportTranslations(sportId);
        }
      }
    }
  },
  computed: {
    ...mapGetters('languages', ['languageList']),
    sportId () {
      return this.sport._id;
    },
    isFullyTranslated () {
      return this.sportTranslations.length >= this.languageList.length;
    }
  },
  methods: {
    addTranslation () {
      this.sportTranslations.push({
        lang: {
          value: '',
          name: ''
        },
        translation: '',
        translationPosition: ''
      });
    },
    onSportTranslationChange (value, index) {
      _.forEach(Object.keys(value), (key) => {
        this.sportTranslations[index][key].$model = value[key];
      });
    }
  },
  validations: {
    sportTranslations: {
      required,
      positionIfNecesary,
      minLength: minLength(1),
      $each: {
        lang: {
          value: {
            required,
            minLength: minLength(1)
          }
        },
        translation: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(250)
        },
        translationPosition: {
          minLength: minLength(1),
          maxLength: maxLength(250)
        }
      }
    }
  }
};
