<template>
  <b-container fluid class="pt-2 pb-2">
    <b-row align-v="center">
      <b-col class="h1" cols="6" md="8" lg="10">{{$tc('entities.report', 1)}}</b-col>
      <b-col cols="6" md="4" lg="2">
        <b-form-select v-model="comparison" :options="comparisonOptions" size="sm"/>
      </b-col>
    </b-row>
    <hr>
    <b-row v-if="loading">
      <b-col>
        <div>{{ $t('form.loading', { entity: $tc('entities.anthropometry', 2)}) }}</div>
        <div>
          <loading-animation/>
        </div>
      </b-col>
    </b-row>
    <b-row class="p-0" v-if="!loading && isAnthropometryCompleted">
      <b-col>
        <anthropometry-report
          :anthropometry="anthropometry"
          :comparisonAnthropometry="comparisonOrNull"
        />
      </b-col>
    </b-row>
    <b-row class="p-0" v-if="!loading && !isAnthropometryCompleted">
      <b-col>
        <div>{{ $t('anthropometries.incomplete') }}</div>
        <div>
          <router-link
            :to="editAnthropometryRoute"
          >{{ $t('form.editEntity', { entity: $tc('entities.anthropometry', 1).toLowerCase() }) }}</router-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss" scoped>
h1 span {
  margin-left: 100px;
}
</style>

<script src="./anthropometry-view-report.js"></script>
