<script setup lang="ts">
import { useTodosStore } from '../stores';

interface Props {
  todoId: number;
}

defineProps<Props>();

const todosStore = useTodosStore();
</script>

<template>
  <button class="remove-todo-button" @click="() => todosStore.removeToDo(todoId)">X</button>
</template>

<style lang="scss">
.remove-todo-button {
  cursor: pointer;
  padding: 7px 10px;
}
</style>
