<template>
  <b-container fluid>
    <h1>{{$tc('entities.patient', 2)}}</h1>
    <hr>
    <patient-search-form @patient-search="onPatientSearch" :is-searching="searching"/>
    <b-row>
      <b-col>
        <patient-list :patients="patients" :search-term="searchTerm"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script src="./patient-search.js"></script>
