<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand :to="{name: 'index'}">Davinci</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item
          :to="{name: 'patients-search'}"
          :active="isPatientsSearch"
        >{{$tc('entities.patient', 2)}}</b-nav-item>
        <b-nav-item
          :to="{name: 'anthropometries-search'}"
          :active="isAnthropometriesSearch"
        >{{$t('navBar.anthropometries')}}</b-nav-item>
        <b-nav-item
          :to="{name: 'sports-search'}"
          :active="isSportsSearch"
          v-if="canManageSport"
        >{{$tc('entities.sport', 2)}}</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="userName" right>
          <b-dropdown-item
            :to="{name: 'user-settings', params: { userId: user._id }}"
          >{{$t('navBar.settings')}}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click.prevent="performLogout">{{$t('navBar.logout')}}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script src="./top-bar.js"></script>
