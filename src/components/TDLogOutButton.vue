<script setup lang="ts">
import router from '@/router';
import { useAuthorizationStore } from '../stores';

const authorizationStore = useAuthorizationStore();

const handleLogOutClick = () => {
  authorizationStore.logOut();
  router.push('/login');
};
</script>

<template>
  <button
    class="log-out-button"
    :class="authorizationStore.isUserAuthorized ? '' : 'hidden'"
    type="button"
    @click="handleLogOutClick"
  >
    Log Out
  </button>
</template>

<style lang="scss">
@import 'mixins';

.log-out-button {
  @include authorization-button;
}
</style>
