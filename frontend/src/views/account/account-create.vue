<template>
  <b-container class="text-center">
    <b-form @submit.prevent="createAccount" class="form-create-account" novalidate>
      <b-form-group
        id="account-create-email-group"
        :label="$t('form.email')"
        label-for="account-create-email"
      >
        <b-form-input
          id="account-create-email"
          type="email"
          v-model.trim="email"
          @input="$v.email.$touch()"
          :state="$v.email.$error ? 'invalid' : 'valid'"
          name="email"
          aria-describedby="account-create-email-message"
          :placeholder="$t('form.email')"
        />
        <b-form-invalid-feedback
          v-if="emailAlreadyExist !== ''"
          id="account-create-email-message"
          v-t="{path:'account.accountAlreadyExist', args: {email: emailAlreadyExist}}"
        />
      </b-form-group>
      <b-form-group
        id="account-create-first-name-group"
        :label="$t('form.firstName')"
        label-for="account-create-first-name"
      >
        <b-form-input
          id="account-create-first-name"
          type="text"
          v-model.trim="firstName"
          @input="$v.firstName.$touch()"
          :state="$v.firstName.$error ? 'invalid' : 'valid'"
          name="firstName"
          aria-describedby="account-create-first-name-message"
          :placeholder="$t('form.firstName')"
        />
      </b-form-group>
      <b-form-group
        id="account-create-last-name-group"
        :label="$t('form.lastName')"
        label-for="account-create-last-name"
      >
        <b-form-input
          id="account-create-last-name"
          type="text"
          v-model.trim="lastName"
          @input="$v.lastName.$touch()"
          :state="$v.lastName.$error ? 'invalid' : 'valid'"
          name="lastName"
          aria-describedby="account-create-last-name-message"
          :placeholder="$t('form.lastName')"
        />
      </b-form-group>
      <b-form-group
        id="account-create-password-group"
        :label="$t('form.password')"
        label-for="account-create-password"
      >
        <b-form-input
          id="account-create-password"
          type="password"
          v-model.trim="password"
          @input="$v.password.$touch()"
          name="password"
          :state="$v.password.$error ? 'invalid' : 'valid'"
          aria-describedby="account-create-password-message"
          :placeholder="$t('form.password')"
        />
        <b-form-invalid-feedback
          id="account-create-password-message"
        >{{$t("form.validation.password") }}</b-form-invalid-feedback>
      </b-form-group>
      <recaptcha
        ref="recaptcha"
        @re-captcha-validation="onRecaptchaValidation"
        @re-captcha-loading="onRecaptchaLoading"
        site-key="6LdbKGQUAAAAAGJrlCGDlLtNp2i3L5koCWYRC1u_"
      ></recaptcha>
      <b-button
        type="submit"
        class="btn btn-lg btn-primary btn-block"
        variant="primary"
        :disabled="recaptchaLoading || !recaptchaValidated || $v.$pending || $v.$error"
      >{{$t('account.create')}}</b-button>
    </b-form>
  </b-container>
</template>

<script src="./account-create.js"></script>

<style scoped lang="scss" src="./account-create.scss"></style>
