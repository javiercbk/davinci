<template>
  <b-container fluid class="pb-lg-3">
    <h1>{{$t('patients.creation')}}</h1>
    <hr>
    <patient-form :patient-id="entityId"/>
  </b-container>
</template>

<script src="./patient-create.js"></script>
