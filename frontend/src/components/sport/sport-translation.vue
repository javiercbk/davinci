<template>
  <div>
    <b-form-group
      :label-cols-sm="3"
      :label-cols-md="1"
      :label="$tc('entities.language', 1)"
      novalidate
    >
      <language-selector name="lang" v-model="lang.$model" :searchable="false"/>
    </b-form-group>
    <b-form-group
      :label-cols-sm="3"
      :label-cols-md="1"
      :label="$tc('entities.translation', 1)"
      novalidate
    >
      <b-form-input type="text" v-model.trim="translation.$model" name="translation"/>
    </b-form-group>
    <b-form-group
      :label-cols-sm="3"
      :label-cols-md="1"
      :label="$tc('entities.translationPosition', 1)"
      novalidate
    >
      <b-form-input
        type="text"
        v-model.trim="translationPosition.$model"
        @input="translationPosition.$touch()"
        name="translationPosition"
      />
    </b-form-group>
  </div>
</template>

<script src="./sport-translation.js"></script>
