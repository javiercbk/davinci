import SportsTranslations from '../../../components/sport/sports-translations.vue';
import SportForm from '../../../components/sport/sport-form.vue';
import { emptySport } from '../../../lib/sport';
import { isAnthropometryCompleted } from '../../../lib/anthropometry';

export default {
  components: {
    SportForm,
    SportsTranslations
  },
  props: {
    entityId: {
      type: String
    }
  },
  data () {
    return {
      sport: emptySport()
    };
  },
  computed: {
    isSportCompleted () {
      if (this.sport) {
        return isAnthropometryCompleted(this.sport);
      }
      return false;
    }
  },
  methods: {
    onSportLoaded (sportLoaded) {
      this.sport = sportLoaded;
    }
  }
};
