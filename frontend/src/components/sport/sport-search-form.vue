<template>
  <b-form @submit.prevent="searchPatients" novalidate autocomplete="off">
    <h6 v-t="'sports.search'"></h6>
    <b-form-group
      id="sport-search-name-group"
      :label="$t('form.name')"
      label-for="sport-search-name"
    >
      <b-form-input
        id="sport-search-name"
        type="text"
        v-model.trim="name"
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
        v-model.trim="position"
        :placeholder="$t('sports.position')"
      ></b-form-input>
    </b-form-group>
    <b-form-group :label="$t('patients.gender.default')">
      <b-form-radio-group
        id="sport-search-gender"
        v-model="gender"
        name="gender"
        :options="genderOptions"
      ></b-form-radio-group>
    </b-form-group>

    <b-form-group>
      <b-btn
        type="button"
        variant="primary"
        class="align-right mt-2"
        @click.prevent="search"
        v-t="'form.search'"
      />
      <b-btn
        type="button"
        variant="primary"
        class="align-right mt-2 ml-1"
        @click.prevent="createNew"
        v-t="{ path: 'form.createNewEntity', args: { entity: $tc('entities.sport', 1).toLowerCase()} }"
      />
    </b-form-group>
  </b-form>
</template>

<script src="./sport-search-form.js"></script>
