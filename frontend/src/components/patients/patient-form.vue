<template>
  <b-form @submit.prevent="createPatient" novalidate>
    <b-form-group
      id="create-patient-first-name-group"
      :label="$t('form.firstName')"
      label-for="create-patient-first-name"
    >
      <b-form-input
        id="create-patient-first-name"
        type="text"
        v-model.trim="patient.firstName"
        @input="$v.patient.firstName.$touch()"
        name="firstName"
        aria-describedby="create-patient-first-name-message"
        :state="firstNameValidationState"
        :placeholder="$t('form.firstName')"
      />
      <b-form-invalid-feedback
        id="create-patient-first-name-message"
      >{{ $t('validations.errors.required', { field: $t('form.firstName') }) }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="create-patient-last-name-group"
      :label="$t('form.lastName')"
      label-for="create-patient-last-name"
    >
      <b-form-input
        id="create-patient-last-name"
        type="text"
        v-model.trim="patient.lastName"
        @input="$v.patient.lastName.$touch()"
        name="lastName"
        aria-describedby="create-patient-last-name-message"
        :state="lastNameValidationState"
        :placeholder="$t('form.lastName')"
      />
      <b-form-invalid-feedback
        id="create-patient-last-name-message"
      >{{ $t('validations.errors.required', { field: $t('form.lastName') }) }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="create-patient-email-group"
      :label="$t('form.email')"
      label-for="create-patient-email"
    >
      <b-form-input
        id="create-patient-email"
        type="email"
        v-model.trim="patient.email"
        @input="$v.patient.email.$touch()"
        name="email"
        aria-describedby="create-patient-email-message"
        :state="emailValidationState"
        :placeholder="$t('form.email')"
      />
      <b-form-invalid-feedback
        id="create-patient-email-message"
      >{{ $t('validations.errors.email', { field: $t('form.email') }) }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="create-patient-personal-id-group"
      :label="$t('patients.personalId')"
      label-for="create-patient-personal-id"
    >
      <b-form-input
        id="create-patient-personal-id"
        type="text"
        v-model.trim="patient.personalId"
        @input="$v.patient.personalId.$touch()"
        name="personalId"
        aria-describedby="create-patient-personal-id-message"
        :state="personalIdValidationState"
        :placeholder="$t('patients.personalId')"
      />
      <b-form-invalid-feedback
        id="create-patient-personal-id-message"
      >{{ $t('validations.errors.maxLength', { field: $t('form.email'), length: $v.patient.personalId.$params.maxLength.max }) }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="create-patient-birth-date-group"
      :label="$t('patients.birthDate')"
      label-for="create-patient-birth-date"
    >
      <utc-flatpickr
        id="create-patient-birth-date"
        v-model.trim="patient.birthDate"
        @input="$v.patient.birthDate.$touch()"
        class="form-control"
        :class="{'is-valid': birthDateValidationState === 'valid', 'is-invalid': birthDateValidationState === 'invalid'}"
        name="birthDate"
        aria-describedby="create-patient-birth-date-message"
        :placeholder="$t('patients.birthDate')"
      />
      <b-form-invalid-feedback
        id="create-patient-birth-date-message"
      >{{ $t('validations.errors.required', { field: $t('patients.birthDate') }) }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="create-patient-coo-group"
      :label="$t('patients.countryOfOrigin')"
      label-for="create-patient-coo"
    >
      <country-selector
        id="create-patient-coo"
        v-model="patient.countryOfOrigin"
        @input="$v.patient.countryOfOrigin.$touch()"
        name="countryOfOrigin"
        aria-describedby="create-patient-coo-message"
        :class="{'mutiselect-is-valid': countryOfOriginValidationState === 'valid', 'mutiselect-is-invalid': countryOfOriginValidationState === 'invalid' }"
        :placeholder="$t('form.countryOfOrigin')"
      />
      <b-form-invalid-feedback
        id="create-patient-coo-message"
      >{{ $t('validations.errors.required', { field: $t('patients.countryOfOrigin') }) }}</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="create-patient-gender-group"
      :label="$t('patients.gender.default')"
      label-for="create-patient-gender"
    >
      <b-form-radio-group
        id="create-patient-gender"
        v-model="patient.gender"
        name="gender"
        @input="$v.patient.gender.$touch()"
      >
        <b-form-radio value="M">{{$t('patients.gender.male')}}</b-form-radio>
        <b-form-radio value="F">{{$t('patients.gender.female')}}</b-form-radio>
      </b-form-radio-group>
      <b-form-invalid-feedback
        id="create-patient-gender-message"
      >{{ $t('validations.errors.required', { field: $t('patients.gender.default') }) }}</b-form-invalid-feedback>
    </b-form-group>
    <b-button type="submit" variant="primary" :disabled="$v.$invalid">{{saveMessage}}</b-button>
  </b-form>
</template>

<script src="./patient-form.js"></script>
