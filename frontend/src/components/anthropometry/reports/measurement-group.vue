<template>
  <b-container fluid>
    <b-row class="align-items-center p-0">
      <b-col md="4" sm="6" class="font-weight-bold">{{groupName}}</b-col>
      <b-col md="8" sm="6">
        <b-row v-for="(measurement, index) in measurements" :key="measurement.name">
          <b-col>{{measurement.name}}</b-col>
          <b-col>
            <template v-if="hasComparison && comparison[index].value !== measurement.value">
              <span class="text-muted">{{comparison[index].value}}</span>
            </template>
            <span :class="{'pl-1': hasComparison}">{{measurement.value}}</span>
          </b-col>
          <b-col>
            <span
              v-if="hasComparison && comparison[index].scoreZ !== measurement.scoreZ"
              class="text-muted"
            >{{comparison[index].scoreZ || '' | decimal(2)}}</span>
            <span :class="{'pl-1': hasComparison}">{{measurement.scoreZ || '' | decimal(2)}}</span>
          </b-col>
          <b-col v-if="hasComparison">
            <comparison-icon :comp="comparison[index].value" :val="measurement.value"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script src="./measurement-group.js"></script>
