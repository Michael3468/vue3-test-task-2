<script setup lang="ts">
import router from '@/router';
import { useAuthorizationStore } from '../stores';
import { TDToDoList } from '@/components';
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
    <div class="container">
      <h1>TODOS</h1>

      <!-- Log Out button -->
      <button
        class="authorization-button"
        :class="authorizationStore.isUserAuthorized ? '' : 'hidden'"
        @click="authorizationStore.logOut"
      >
        Log Out
      </button>

      <TDToDoList />
    </div>
  </main>
</template>
