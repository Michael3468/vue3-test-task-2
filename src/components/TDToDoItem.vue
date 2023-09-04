<script setup lang="ts">
import { onMounted } from 'vue';
import draggable from 'vuedraggable';
import { useTodosStore } from '../stores';
// eslint-disable-next-line import/no-cycle
import { TDCheckboxStatusButton, TDEditToDoButton, TDRemoveToDoButton } from '.';

import { formatDate } from '../libs';

const todosStore = useTodosStore();

onMounted(() => {
  todosStore.fetchTodos();
});
</script>

<template>
  <draggable v-model="todosStore.searchedTodos" class="todo-list-items" item-key="id">
    <template #item="{ element }">
      <div :key="element.id" class="todo-list-item" :class="todosStore.isLoading ? 'hidden' : ''">
        <div class="todo-list-item__info">
          <!-- title -->
          <p
            class="todo-list-item__info-text"
            :class="todosStore.isTodoEditable(element.id) ? 'hidden' : ''"
          >
            {{ element.title }}
          </p>

          <!-- input for edit title -->
          <input
            v-model="element.title"
            class="todo-list-item__info-edit-input"
            :class="todosStore.isTodoEditable(element.id) ? '' : 'hidden'"
            type="text"
            aria-label="edit todo title"
          />

          <p v-if="element.createdTime">
            {{
              element.createdTime
                ? `created: ${formatDate(element.createdTime, 'hh:mm:ss dd/mm/yyyy')}`
                : ''
            }}
          </p>
          <p v-if="element.expirationTime">
            {{
              element.expirationTime
                ? `expiration: ${formatDate(element.expirationTime, 'hh:mm:ss dd/mm/yyyy')}`
                : ''
            }}
          </p>
        </div>

        <!-- buttons -->
        <div class="todo-list-item-buttons">
          <TDEditToDoButton :id="element.id" />

          <TDCheckboxStatusButton :todo="element" />

          <TDRemoveToDoButton :todo-id="element.id" />
        </div>
      </div>
    </template>
  </draggable>
</template>

<style lang="scss">
@import 'variables';

.todo-list-items {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
}

.todo-list-item {
  display: flex;
  justify-content: space-between;
  gap: 0 10px;
  border: 1px solid black;
  border-radius: $border-radius;
  padding: 12px 20px;
  background-color: white;
  cursor: grab;

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
