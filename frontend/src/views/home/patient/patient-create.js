import PatientForm from '../../../components/patients/patient-form.vue';

export default {
  components: {
    PatientForm
  },
  props: {
    entityId: {
      type: String
    }
  }
};
