<template>
  <div>
    <span v-if="loading">
      <font-awesome-icon :icon="icons"/>
    </span>
    <span v-if="!loading" class="font-weight-bold pl-1">{{fullName}}</span>
    <span v-if="!loading" class="font-weight-light">({{patient.personalId}})</span>
  </div>
</template>

<script src="./patient-summary.js"></script>
