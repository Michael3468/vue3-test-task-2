<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuthorizationStore, useTodosStore } from '../stores';
import { TDAddToDo, TDLoader } from '.';

import ClipboardEditOutline from 'vue-material-design-icons/ClipboardEditOutline.vue';
import type { ITodo } from '@/types';

const authorizationStore = useAuthorizationStore();
const todosStore = useTodosStore();

interface IEditableTitle {
  isEditable: boolean;
  todo_id: number | null;
}

const editableTitle = ref<IEditableTitle>({ isEditable: false, todo_id: null });

const editTodoTitle = (todoId: number) => {
  const newStatus = !editableTitle.value.isEditable;

  editableTitle.value = { isEditable: newStatus, todo_id: newStatus ? todoId : null };
};

const handleCheckboxChange = (event: Event, todo: ITodo) => {
  const checkbox = event.target as HTMLInputElement;

  const key = (event as KeyboardEvent).key;
  if (key === 'Enter') {
    checkbox.checked = !checkbox.checked;
  }

  todosStore.todos?.map((item) => {
    if (item.id === todo.id) {
      item.completed = checkbox.checked;
    }
    return item;
  });
};

const handleEditTitleKeyDown = (event: KeyboardEvent, todoId: number) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    editTodoTitle(todoId);
  }
};

const handleCheckboxKeyDown = (event: KeyboardEvent, todo: ITodo) => {
  if (event.key === ' ' || event.key === 'Enter') {
    handleCheckboxChange(event, todo);
  }
};

const isTitleEditable = (todoId: number) => {
  return editableTitle.value.isEditable && editableTitle.value.todo_id === todoId;
};

watch(
  () => authorizationStore.isUserAuthorized,
  (isAuthorized) => isAuthorized && todosStore.fetchTodos(),
);
</script>

<template>
  <div class="todo-list" :class="authorizationStore.isUserAuthorized ? '' : 'hidden'">
    <TDAddToDo />

    <TDLoader :isLoading="todosStore.isLoading" />

    <!-- TODO list -->
    <div
      class="todo-list-item"
      :class="todosStore.isLoading ? 'hidden' : ''"
      v-for="todo in todosStore.todos"
      :key="todo.id"
    >
      <div class="todo-list-item__info">
        <!-- TODO title -->
        <p class="todo-list-item__text" :class="isTitleEditable(todo.id) ? 'hidden' : ''">
          {{ todo.title }}
        </p>

        <!-- input for edit TODO title -->
        <input
          class="todo-list-item__edit-input"
          :class="isTitleEditable(todo.id) ? '' : 'hidden'"
          type="text"
          v-model="todo.title"
        />
      </div>

      <!-- TODO buttons -->
      <div class="todo-list-item-tools">
        <!-- edit TODO button -->
        <div
          class="todo-list-item-tools__edit"
          tabIndex="0"
          @keydown="(event) => handleEditTitleKeyDown(event, todo.id)"
        >
          <ClipboardEditOutline @click="() => editTodoTitle(todo.id)" />
        </div>

        <!-- TODO checkbox status -->
        <input
          class="todo-list-item-tools__status"
          type="checkbox"
          :checked="todo.completed"
          @keydown="(event) => handleCheckboxKeyDown(event, todo)"
          @input="(event) => handleCheckboxChange(event, todo)"
        />

        <!-- remove TODO -->
        <button
          class="todo-list-item-tools__remove-button"
          @click="() => todosStore.removeToDo(todo.id)"
        >
          X
        </button>
      </div>
    </div>
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
  }

  &__text {
    font-size: 1.2rem;
    width: 100%;
  }

  &__edit-input {
    font-size: 1.2rem;
    margin-top: 7px;
  }
}

.todo-list-item-tools {
  display: flex;
  align-items: center;
  gap: 0 10px;

  &__edit,
  &__status,
  &__remove-button {
    cursor: pointer;
  }

  &__edit {
    margin-top: 7px;
  }

  &__remove-button {
    padding: 7px 10px;
  }
}
</style>
