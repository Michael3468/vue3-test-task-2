<script setup lang="ts">
import { useTodosStore } from '../stores';
import ClipboardEditOutline from 'vue-material-design-icons/ClipboardEditOutline.vue';

interface Props {
  id: number;
}
defineProps<Props>();

const todosStore = useTodosStore();

const editTodoTitle = (todoId: number) => {
  const newStatus = !todosStore.editableTodo.isEditable;

  todosStore.editableTodo = { isEditable: newStatus, todo_id: newStatus ? todoId : null };
};

const handleEditTitleKeyDown = (event: KeyboardEvent, todoId: number) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    editTodoTitle(todoId);
  }
};
</script>

<template>
  <div
    class="edit-todo-button"
    tabIndex="0"
    @keydown="(event) => handleEditTitleKeyDown(event, id)"
  >
    <ClipboardEditOutline @click="() => editTodoTitle(id)" />
  </div>
</template>

<style lang="scss">
.edit-todo-button {
  cursor: pointer;
  margin-top: 7px;
}
</style>
