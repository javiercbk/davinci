<template>
  <b-form @submit.prevent="searchPatients" novalidate autocomplete="off">
    <b-form-group
      id="anthropometry-search-from"
      :label="$t('form.from')"
      label-for="anthropometry-search-from-input"
    >
      <utc-flatpickr
        id="anthropometry-search-from-input"
        class="form-control"
        v-model.trim="from"
        name="from"
        :placeholder="$t('anthropometries.from')"
      />
    </b-form-group>
    <b-form-group
      id="anthropometry-search-to"
      :label="$t('form.to')"
      label-for="anthropometry-search-to-input"
    >
      <utc-flatpickr
        id="anthropometry-search-to-input"
        class="form-control"
        v-model.trim="to"
        name="to"
        :placeholder="$t('anthropometries.to')"
      />
    </b-form-group>
    <b-form-group
      id="anthropometry-search-patient"
      :label="$t('patients.searchPlaceholder')"
      label-for="anthropometry-search-patient-input"
    >
      <patient-async-selector
        id="anthropometry-search-patient-input"
        v-model="patient"
        :placeholder="$t('patients.searchPlaceholder')"
      />
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
        v-t="{ path: 'form.createNewEntity', args: { entity: $tc('entities.anthropometry', 1).toLowerCase()} }"
      />
    </b-form-group>
  </b-form>
</template>

<script src="./anthropometry-search-form.js"></script>
