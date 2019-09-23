<template>
  <b-form-group :label-cols-sm="12" :label-cols-md="3" :label="label" novalidate>
    <div
      class="input-group"
      :class="{'warning-measurement': isRequired && !isRequiredValid, 'valid-measurement': isRequiredValid}"
    >
      <input
        class="form-control"
        ref="measurementInput"
        v-for="(arrVal, index) in valueArray"
        :key="index"
        :name="name"
        min="0"
        type="number"
        :placeholder="placeholder"
        @change="onInputChange(index, $event)"
        :value="arrVal"
        @blur="onBlur(index)"
      >
      <b-btn
        class="flat-border-left"
        variant="secondary"
        :disabled="!this.canAddMoreMeasurements"
        @click.prevent="add"
      >+</b-btn>
    </div>
  </b-form-group>
</template>

<style lang="scss" scoped src="./anthropometry-measurements.scss"></style>

<script src="./anthropometry-measurements.js"></script>
