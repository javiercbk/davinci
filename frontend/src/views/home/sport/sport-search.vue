<template>
  <b-container fluid>
    <h1>{{$tc('entities.sport', 2)}}</h1>
    <hr>
    <sport-search-form @sport-search="onSportSearch"/>
    <b-row>
      <b-col>
        <sport-list :search-term="sportSearchTerm" :sports="sports"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script src="./sport-search.js"></script>
