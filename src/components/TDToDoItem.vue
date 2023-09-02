<script setup lang="ts">
import { watch } from 'vue';
import { useAuthorizationStore, useTodosStore } from '../stores';
import { TDCheckboxStatusButton, TDEditToDoButton, TDRemoveToDoButton } from '.';

const authorizationStore = useAuthorizationStore();
const todosStore = useTodosStore();

watch(
  () => authorizationStore.isUserAuthorized,
  (isAuthorized) => isAuthorized && todosStore.fetchTodos(),
);
</script>

<template>
  <div
    v-for="todo in todosStore.todos"
    class="todo-list-item"
    :class="todosStore.isLoading ? 'hidden' : ''"
    :key="todo.id"
  >
    <div class="todo-list-item__info">
      <!-- title -->
      <p
        class="todo-list-item__info-text"
        :class="todosStore.isTodoEditable(todo.id) ? 'hidden' : ''"
      >
        {{ todo.title }}
      </p>

      <!-- input for edit title -->
      <input
        class="todo-list-item__info-edit-input"
        :class="todosStore.isTodoEditable(todo.id) ? '' : 'hidden'"
        type="text"
        v-model="todo.title"
      />
    </div>

    <!-- buttons -->
    <div class="todo-list-item-buttons">
      <TDEditToDoButton :id="todo.id" />

      <TDCheckboxStatusButton :todo="todo" />

      <TDRemoveToDoButton :todoId="todo.id" />
    </div>
  </div>
</template>

<style lang="scss">
@import 'variables';

.todo-list-item {
  display: flex;
  justify-content: space-between;
  gap: 0 10px;
  border: 1px solid black;
  border-radius: $border-radius;
  padding: 12px 20px;
  background-color: white;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    width: 100%;

    &-text {
      font-size: 1.2rem;
      width: 100%;
    }

    &-edit-input {
      font-size: 1.2rem;
      margin-top: 7px;
    }
  }
}

.todo-list-item-buttons {
  display: flex;
  align-items: center;
  gap: 0 10px;
}
</style>
