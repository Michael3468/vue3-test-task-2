<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useTodosStore } from '@/stores';

const todosStore = useTodosStore();
const searchTodoInputRef = ref<HTMLInputElement | null>(null);

const handleClearButtonClick = () => {
  if (searchTodoInputRef.value) {
    searchTodoInputRef.value.value = '';
    searchTodoInputRef.value.focus();
    todosStore.searchTodo(toRef(searchTodoInputRef));
  }
};
</script>

<template>
  <div class="search-todo">
    <input
      class="search-todo__input"
      type="text"
      placeholder="Search todo"
      ref="searchTodoInputRef"
      @input="todosStore.searchTodo(toRef(searchTodoInputRef))"
    />
    <button class="search-todo__clear-button" @click="handleClearButtonClick">X</button>
  </div>
</template>

<style lang="scss">
@import 'mixins';

.search-todo {
  @include input-with-separate-button;

  &__input {
    @include input;
  }

  &__clear-button {
    @include input-button;
  }
}
</style>
