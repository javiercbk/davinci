<template>
  <div class="w-100">
    <b-alert
      v-for="n in notifications"
      :key="n.id"
      :variant="n.variant"
      show>
      <b v-if="n.title">{{n.title}}</b> {{n.message}}
    </b-alert>
  </div>
</template>

<script src="./notification-manager.js"></script>
