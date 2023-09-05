<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '@/stores';

const todosStore = useTodosStore();
const searchTodoInputRef = ref<HTMLInputElement | null>(null);

const handleClearButtonClick = () => {
  if (searchTodoInputRef.value) {
    searchTodoInputRef.value.value = '';
    searchTodoInputRef.value.focus();
    todosStore.searchTodo(searchTodoInputRef.value.value);
  }
};
</script>

<template>
  <div class="search-todo">
    <input
      ref="searchTodoInputRef"
      class="search-todo__input"
      type="text"
      placeholder="Search todo"
      aria-label="search todo"
      @input="todosStore.searchTodo(searchTodoInputRef?.value ? searchTodoInputRef.value : '')"
    />
    <button class="search-todo__clear-button" type="button" @click="handleClearButtonClick">
      X
    </button>
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
