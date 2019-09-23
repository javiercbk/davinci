<template>
  <b-container class="text-center mt-4">
    <b-form @submit.prevent="login" class="form-signin" novalidate>
      <b-form-group id="login-email-group" :label="$t('form.email')" label-for="login-email">
        <b-form-input
          id="login-email"
          type="email"
          v-model.trim="email"
          @input="$v.email.$touch()"
          :state="$v.email.$error ? 'invalid' : 'valid'"
          name="email"
          aria-describedby="login-email-message"
          :placeholder="$t('form.email')"
        />
        <b-form-invalid-feedback
          id="login-email-message"
        >{{$t('validations.errors.email', { field: 'email' })}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="login-password-group"
        :label="$t('form.password')"
        label-for="login-password"
      >
        <b-form-input
          id="login-password"
          type="password"
          v-model="password"
          @input="$v.password.$touch()"
          :state="$v.password.$error ? 'invalid' : 'valid'"
          name="password"
          aria-describedby="login-password-message"
          :placeholder="$t('form.password')"
        />
        <b-form-invalid-feedback id="login-password-message">{{$t("form.validation.password") }}</b-form-invalid-feedback>
      </b-form-group>
      <b-button
        type="submit"
        class="btn btn-lg btn-primary btn-block"
        variant="primary"
        :disabled="$v.$error"
      >{{$t('login.default')}}</b-button>
    </b-form>
  </b-container>
</template>

<script src="./login.js"></script>

<style scoped lang="scss" src="./login.scss"></style>
