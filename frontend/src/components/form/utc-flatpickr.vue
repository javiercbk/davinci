<template>
  <flat-pickr class="utc-flatpickr" v-model.trim="clientDateStr" v-bind="wrappedProps" v-on="wrappedListeners"></flat-pickr>
</template>

<script src="./utc-flatpickr.js"></script>

<style lang="scss" scoped>
input.utc-flatpickr[readonly] {
  background-color: white;
}
</style>
