<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useTodosStore } from '@/stores';

const todosStore = useTodosStore();
const newTodoInputRef = ref<HTMLInputElement | null>(null);
</script>

<template>
  <div class="add-todo">
    <input class="add-todo__input" type="text" placeholder="add new todo" ref="newTodoInputRef" />
    <button class="add-todo__add-button" @click="todosStore.addToDo(toRef(newTodoInputRef))">
      +
    </button>
  </div>
</template>

<style lang="scss">
@import 'variables';

.add-todo {
  display: flex;
  gap: 0 10px;

  &__input {
    width: 100%;
    padding: 10px;
    border-radius: $border-radius;
    border: 1px solid black;
  }

  &__add-button {
    width: 50px;
  }
}
</style>
