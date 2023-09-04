<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useTodosStore } from '@/stores';

const todosStore = useTodosStore();
const newTodoInputRef = ref<HTMLInputElement | null>(null);
</script>

<template>
  <div class="add-todo">
    <input
      ref="newTodoInputRef"
      class="add-todo__input"
      type="text"
      placeholder="Add new todo"
      aria-label="add todo"
    />
    <button
      class="add-todo__add-button"
      type="button"
      @click="todosStore.addToDo(toRef(newTodoInputRef))"
    >
      +
    </button>
  </div>
</template>

<style lang="scss">
@import 'variables';
@import 'mixins';

.add-todo {
  @include input-with-separate-button;

  &__input {
    @include input;
  }

  &__add-button {
    @include input-button;
  }
}
</style>
