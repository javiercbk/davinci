import PatientAsyncSelector from './patient-async-selector.vue';

export default {
  components: {
    PatientAsyncSelector,
  },
  props: {
    input: {
      type: Object,
    },
  },
  data () {
    return {
      patient: {
        _id: null,
        firstName: null,
        lastName: null,
        birthDate: null,
      },
    };
  },
  watch: {
    input: {
      immediate: true,
      handler (newValue) {
        this.patient = newValue;
      },
    },
    patient (newValue) {
      this.$emit('patient-selected', newValue);
    }
  },
  methods: {
    createNewPatient () {
      this.$emit('create-new-patient');
    }
  }
};
