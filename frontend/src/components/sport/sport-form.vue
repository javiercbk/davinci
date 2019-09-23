<template>
  <b-form novalidate autocomplete="off" @submit="onSubmit">
    <b-form-group
      id="sport-search-name-group"
      :label="$t('form.name')"
      label-for="sport-search-name"
    >
      <b-form-input
        id="sport-search-name"
        type="text"
        v-model.trim="sport.name"
        :placeholder="$t('form.name')"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="sport-search-position-group"
      :label="$t('sports.position')"
      label-for="sport-search-position"
    >
      <b-form-input
        id="sport-search-position"
        type="text"
        v-model.trim="sport.position"
        :placeholder="$t('sports.position')"
      ></b-form-input>
    </b-form-group>
    <b-form-group :label="$t('patients.gender.default')">
      <b-form-radio-group
        id="sport-search-gender"
        v-model="sport.gender"
        name="gender"
        :options="genderOptions"
      ></b-form-radio-group>
    </b-form-group>
    <h6 v-t="'anthropometries.measurement'"></h6>
    <anthropometry-raw-form :anthropometry="sport"/>
    <form-save/>
  </b-form>
</template>

<script src="./sport-form.js"></script>
