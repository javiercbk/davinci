<template>
  <b-form-group id="patient-search-crete-group"
                :label="$t('patients.search')"
                label-for="patient-search-create-input">
    <b-input-group>
      <!-- v-model="patient" -->
      <patient-async-selector id="patient-search-create-input" v-model="patient" :placeholder="$t('patients.searchPlaceholder')" class="multiselect-button-right form-control p-0 border-0"/>
      <b-input-group-append>
        <b-btn type="submit" variant="primary" @click="createNewPatient">{{$t('form.createNewEntity', { entity: $tc('entities.patient', 1).toLowerCase()})}}</b-btn>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script src="./patient-search-create.js"></script>
