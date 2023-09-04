<script setup lang="ts">
import { ref, toRef, type Ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useTodosStore } from '@/stores';
import '@vuepic/vue-datepicker/dist/main.css';

const todosStore = useTodosStore();
const newTodoInputRef = ref<HTMLInputElement | null>(null);
const inputValueRef = ref<string>('');
const addTodoButtonRef = ref<HTMLButtonElement | null>(null);
const date = ref();
const VueDatePickerRef = ref();

const handleAddButtonClick = (inputRef: Ref<HTMLInputElement | null>, expDate: Date) => {
  todosStore.addToDo(toRef(inputRef), expDate);
  VueDatePickerRef.value.clearValue();
  inputValueRef.value = '';
  newTodoInputRef.value?.focus();
};

const handleClose = () => {
  addTodoButtonRef.value?.focus();
};
</script>

<template>
  <div class="add-todo">
    <div class="add-todo__input-and-button">
      <input
        ref="newTodoInputRef"
        v-model="inputValueRef"
        class="add-todo__input"
        type="text"
        placeholder="Add new todo"
        aria-label="add todo"
      />

      <button
        ref="addTodoButtonRef"
        class="add-todo__add-todo"
        type="button"
        :disabled="!inputValueRef"
        @click="handleAddButtonClick(toRef(newTodoInputRef), date)"
      >
        +
      </button>
    </div>

    <VueDatePicker
      ref="VueDatePickerRef"
      v-model="date"
      :flow="['calendar']"
      placeholder="Enter expiration date"
      @update:model-value="handleClose"
    />
  </div>
</template>

<style lang="scss">
@import 'variables';
@import 'mixins';

.add-todo {
  @include input-with-separate-button;
  flex-direction: column;
  gap: 10px 0;
  border: 1px solid black;
  border-radius: $border-radius;
  padding: 10px;

  &__input-and-button {
    display: flex;
    flex-direction: row;
    gap: 0 10px;
  }

  &__input {
    @include input;
  }

  &__add-todo {
    @include input-button;

    &:focus {
      border: 2px solid $color-focus;
      border-radius: $border-radius;

      &:not([tabindex='-1']) {
        outline: none;
      }
    }
  }
}

// VueDatePicker styles +
.dp__input_focus {
  border: 2px solid $color-focus;
}
// VueDatePicker styles -
</style>
