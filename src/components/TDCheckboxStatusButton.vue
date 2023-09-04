<script setup lang="ts">
import { useTodosStore } from '@/stores';
import type { ITodo } from '@/types';

interface Props {
  todo: ITodo;
}

defineProps<Props>();

const todosStore = useTodosStore();

const handleCheckboxChange = (event: Event, todo: ITodo) => {
  const checkbox = event.target as HTMLInputElement;

  const { key } = event as KeyboardEvent;
  if (key === 'Enter') {
    checkbox.checked = !checkbox.checked;
  }

  todosStore.todos?.map((item) => {
    if (item.id === todo.id) {
      return { ...item, completed: checkbox.checked };
    }
    return item;
  });
};

const handleCheckboxKeyDown = (event: KeyboardEvent, todo: ITodo) => {
  if (event.key === ' ' || event.key === 'Enter') {
    handleCheckboxChange(event, todo);
  }
};
</script>

<template>
  <input
    class="checkbox-status-button"
    type="checkbox"
    :checked="todo.completed"
    aria-label="todo status"
    @keydown="(event) => handleCheckboxKeyDown(event, todo)"
    @input="(event) => handleCheckboxChange(event, todo)"
  />
</template>

<style lang="scss">
.checkbox-status-button {
  cursor: pointer;
}
</style>
