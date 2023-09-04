<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { TDLogOutButton, TDToDoList } from '@/components';
import { useAuthorizationStore } from '../stores';

const authorizationStore = useAuthorizationStore();
const router = useRouter();

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
