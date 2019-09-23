<template>
  <b-container fluid class="pt-2 pb-2">
    <h1>{{$t('sports.creation')}}</h1>
    <hr>
    <h6>{{$tc('entities.sport', 1)}}</h6>
    <sport-form :sport-id="entityId" @sport-loaded="onSportLoaded"/>
    <h6 class="pt-3">{{$tc('entities.sportsTranslations', 2)}}</h6>
    <sports-translations :sport="sport" v-if="sport"/>
  </b-container>
</template>

<script src="./sport-create.js"></script>
