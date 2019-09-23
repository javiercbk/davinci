<template>
  <b-form>
    <template v-for="(sp, index) in $v.sportTranslations.$each.$iter">
      <sport-translation
        :key="sp.$model.lang.value"
        :value="sp"
        @input="onSportTranslationChange($event, index)"
      />
    </template>
    <b-btn
      type="button"
      variant="primary"
      @click.prevent="addTranslation"
      :disabled="isFullyTranslated"
    >{{$t('sports.addTranslation')}}</b-btn>
    <b-btn
      type="button"
      variant="primary"
      @click.prevent="saveTranslations"
      :disabled="$v.$invalid"
    >{{$t('form.save')}}</b-btn>
  </b-form>
</template>

<script src="./sports-translations.js"></script>
