<template>
  <b-form novalidate autocomplete="off" @submit="save">
    <!-- <b-form novalidate autocomplete="off" @submit="save"> -->
    <anthropometry-raw-form :anthropometry="anthropometry"/>
    <!-- <b-button type="submit" variant="primary">{{saveMessage}}</b-button> -->
  </b-form>
</template>

<script src="./anthropometry-form.js"></script>
