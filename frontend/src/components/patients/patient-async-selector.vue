<template>
  <multiselect :multiple="false"
  v-bind="$props"
  v-on="wrappedListeners"
  :options="patientsFound"
  :placeholder="$t('patients.searchPlaceholder')"
  :custom-label="fullName"
  track-by="_id"
  :loading="patientsLoading"
  :internal-search="false"
  :options-limit="500"
  @search-change="onSearchChange">
    <template slot="noResult" v-t="{ path: 'form.notFound', args: { entity: $tc('entities.patient', 2).toLowerCase()} }"></template>
  </multiselect>
</template>

<script src="./patient-async-selector.js"></script>
