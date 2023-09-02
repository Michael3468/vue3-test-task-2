<script setup lang="ts">
import router from '@/router';
import { useAuthorizationStore } from '../stores';
import { TDLogOutButton, TDToDoList } from '@/components';
import { onMounted } from 'vue';

const authorizationStore = useAuthorizationStore();

const checkAuth = () => {
  authorizationStore.checkAuthorization();

  if (!authorizationStore.isUserAuthorized) {
    router.push('/login');
  }
};

onMounted(() => checkAuth());
</script>

<template>
  <main>
    <div class="container home-view">
      <h1>TODOS</h1>

      <TDLogOutButton />

      <TDToDoList />
    </div>
  </main>
</template>

<style lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  gap: 20px 0;
}
</style>
