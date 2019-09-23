import LanguageSelector from '../form/language-selector';

export default {
  components: {
    LanguageSelector
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      lang: '',
      translation: '',
      translationPosition: ''
    };
  },
  watch: {
    value: {
      immediate: true,
      handler (newVal) {
        this.lang = newVal.lang;
        this.translation = newVal.translation;
        this.translationPosition = newVal.translationPosition;
      }
    },
    lang () {
      this.onChange();
    },
    translation () {
      this.onChange();
    },
    translationPosition () {
      this.onChange();
    }
  },
  method: {
    onChange () {
      this.$emit('input', {
        lang: this.lang,
        translation: this.translation,
        translationPosition: this.translationPosition
      });
    }
  }
};
