<script setup lang="ts">
import { TDAuthorization, TDToDoList } from '@/components';
</script>

<template>
  <main>
    <div class="container">
      <h1>TODOS</h1>
      <TDAuthorization />

      <TDToDoList />
    </div>
  </main>
</template>
