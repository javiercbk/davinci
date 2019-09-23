<template>
  <multiselect
    :options="countryList"
    track-by="value"
    label="name"
    v-model="activityLevelSelected"
    v-bind="wrappedProps"
    v-on="wrappedListeners">
    <template slot="noResult" v-t="{path: 'form.notFound', args: { entity: $tc('entities.activityLevel', 1).toLowerCase()} }"></template>
  </multiselect>
</template>

<script src="./country-selector.js"></script>
