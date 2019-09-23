<template>
  <b-container fluid>
    <h1>{{$tc('entities.anthropometry', 2)}}</h1>
    <hr>
    <anthropometry-search-form @anthropometry-search="onAnthropometrySearch"/>
    <b-row v-if="isComparing">
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col>
        <anthropometry-list
          :search-term="anthropometrySearchTerm"
          :anthropometries="anthropometries"
          @anthropometry-select-compare="anthropometrySelectCompare"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script src="./anthropometries-search.js"></script>
