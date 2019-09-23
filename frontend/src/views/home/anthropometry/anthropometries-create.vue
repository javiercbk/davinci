<template>
  <b-container fluid class="pt-2 pb-2">
    <h1>{{$t('anthropometries.creation')}}</h1>
    <hr>
    <h6>{{$tc('entities.patient', 1)}}</h6>
    <patient-search-create
      @patient-selected="onPatientSelected"
      @create-new-patient="onNewPatient"
      v-if="!isPatientSelected && !createNewPatient"
    />
    <patient-form @patient-saved="onPatientSaved" v-if="!isPatientSelected && createNewPatient"/>
    <patient-summary v-model="patientSelected" v-if="isPatientSelected"/>
    <h6 class="mt-3">{{$tc('entities.anthropometry', 1)}}</h6>
    <hr>
    <anthropometry-form
      :patient="patientSelected"
      :anthropometry-id="entityId"
      @anthropometry-loaded="onAnthropometryLoaded"
    />
    <hr>
    <b-btn
      type="button"
      variant="primary"
      @click.prevent="navigateReport"
      :disabled="!isAnthropometryCompleted"
    >{{ $tc('entities.report', 1) }}</b-btn>
  </b-container>
</template>

<script src="./anthropometries-create.js"></script>
