<template>
  <b-form @submit.prevent="searchPatients" novalidate>
    <b-form-group id="patient-search-group"
                  :label="$t('patients.search')"
                  label-for="patient-search-input">
      <b-input-group>
        <b-form-input id="patient-search-input"
                      type="text"
                      v-model.trim="patientSearchTerm"
                      :placeholder="$t('patients.searchPlaceholder')">
        </b-form-input>
        <b-input-group-append>
          <b-btn type="submit" variant="primary" :disabled="isSearching">{{$t('patients.searchAll')}}</b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-btn type="button" variant="primary" class="align-right mt-2" @click.prevent="createNew">{{$t('form.createNewEntity', { entity: $tc('entities.patient', 1).toLowerCase()})}}</b-btn>
    </b-form-group>
  </b-form>
</template>

<script src="./patient-search-form.js"></script>
