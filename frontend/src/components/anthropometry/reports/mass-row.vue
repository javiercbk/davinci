<template>
  <b-row>
    <b-col>{{mass.name}}</b-col>
    <b-col>
      <span
        v-if="hasComparison && mass.comparison.percentage !== mass.percentage"
        class="text-muted"
      >{{ mass.comparison.percentage * 100 | decimal(2) }}</span>
      <span :class="{'pl-1': hasComparison}">{{ mass.percentage * 100 | decimal(2) }}</span>
      <comparison-icon
        v-if="hasComparison"
        class="pl-1"
        :comp="mass.comparison.percentage"
        :val="mass.percentage"
      />
    </b-col>
    <b-col>
      <span
        v-if="hasComparison && mass.comparison.adjusted !== mass.adjusted"
        class="text-muted"
      >{{ mass.comparison.adjusted | decimal(2) }}</span>
      <span :class="{'pl-1': hasComparison}">{{ mass.adjusted | decimal(2) }}</span>
      <comparison-icon
        v-if="hasComparison"
        class="pl-1"
        :comp="mass.comparison.adjusted"
        :val="mass.adjusted"
      />
    </b-col>
    <b-col>
      <span
        v-if="hasComparison && mass.scoreZ && mass.comparison.scoreZ !== mass.scoreZ"
        class="text-muted"
      >{{ mass.comparison.scoreZ | decimal(2) }}</span>
      <span :class="{'pl-1': hasComparison}" v-if="mass.scoreZ">{{ mass.scoreZ | decimal(2) }}</span>
      <comparison-icon
        v-if="hasComparison && mass.scoreZ"
        class="pl-1"
        :comp="mass.comparison.scoreZ"
        :val="mass.scoreZ"
      />
    </b-col>
  </b-row>
</template>

<script src="./mass-row.js"></script>
