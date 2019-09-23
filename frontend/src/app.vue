<template>
  <div id="app" @click="onGlobalEvent($event, 'home')" @keydown="onGlobalEvent($event, 'home')">
    <div class="notification-manager">
      <notification-manager :allow-auto-dismiss="false"></notification-manager>
    </div>
    <loading-app v-if="!userRequested"/>
    <home v-else-if="user"/>
    <div v-else-if="$router.currentRoute.name === 'index'" class="h-100 w-100">
      <login/>
    </div>
    <router-view v-else/>
  </div>
</template>

<style lang="scss" scoped src="./app.scss"></style>
<style lang="scss" src="./app_global.scss"></style>

<script src="./app.js"></script>
