<script setup lang="ts">
import { useAuthorizationStore, useTodosStore } from '../stores';
// eslint-disable-next-line import/no-cycle
import { TDAddToDo, TDLoader, TDSearchToDo, TDToDoItem } from '.';

const authorizationStore = useAuthorizationStore();
const todosStore = useTodosStore();
</script>

<template>
  <div class="todo-list" :class="authorizationStore.isUserAuthorized ? '' : 'hidden'">
    <TDSearchToDo />

    <TDAddToDo />

    <TDLoader :is-loading="todosStore.isLoading" />

    <TDToDoItem />
  </div>
</template>

<style lang="scss">
@import 'variables';

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  margin-bottom: 30px;
}
</style>
