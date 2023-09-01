<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuthorizationStore } from '../stores';
import ClipboardEditOutline from 'vue-material-design-icons/ClipboardEditOutline.vue';

const authorizationStore = useAuthorizationStore();

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface IEditableTitle {
  isEditable: boolean;
  todo_id: number | null;
}

const todos = ref<ITodo[] | null>(null);
const editableTitle = ref<IEditableTitle>({ isEditable: false, todo_id: null });
const isLoading = ref<boolean>(false);

const fetchTodos = async () => {
  try {
    isLoading.value = true;

    const response = await fetch(
      `${import.meta.env.VITE_HOST}/users/${authorizationStore.user_id}/todos`,
    );

    todos.value = await response.json();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const handleCheckboxChange = (event: Event, todo: ITodo) => {
  const checkbox = event.target as HTMLInputElement;

  const key = (event as KeyboardEvent).key;
  if (key === 'Enter') {
    checkbox.checked = !checkbox.checked;
  }

  todos.value?.map((item) => {
    if (item.id === todo.id) {
      item.completed = checkbox.checked;
    }
    return item;
  });
};

const editTodoTitle = (todoId: number) => {
  const newStatus = !editableTitle.value.isEditable;

  editableTitle.value = { isEditable: newStatus, todo_id: newStatus ? todoId : null };
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
  (isAuthorized) => isAuthorized && fetchTodos(),
);
</script>

<template>
  <div class="todo-list" :class="authorizationStore.isUserAuthorized ? '' : 'hidden'">
    <div :class="isLoading ? '' : 'hidden'">
      <h2>Loading...</h2>
    </div>

    <div
      class="todo-list-item"
      :class="isLoading ? 'hidden' : ''"
      v-for="todo in todos"
      :key="todo.id"
    >
      <div class="todo-list-item__info">
        <p class="todo-list-item__text" :class="isTitleEditable(todo.id) ? 'hidden' : ''">
          {{ todo.title }}
        </p>

        <input
          class="todo-list-item__edit-input"
          :class="isTitleEditable(todo.id) ? '' : 'hidden'"
          type="text"
          v-model="todo.title"
        />
      </div>

      <div class="todo-list-item-tools">
        <div
          class="todo-list-item-tools__edit"
          tabIndex="0"
          @keydown="(event) => handleEditTitleKeyDown(event, todo.id)"
        >
          <ClipboardEditOutline @click="() => editTodoTitle(todo.id)" />
        </div>

        <input
          class="todo-list-item-tools__status"
          type="checkbox"
          :checked="todo.completed"
          @keydown="(event) => handleCheckboxKeyDown(event, todo)"
          @input="(event) => handleCheckboxChange(event, todo)"
        />
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

  &__edit {
    margin-top: 7px;
    cursor: pointer;
  }

  &__status {
    cursor: pointer;
  }
}
</style>
