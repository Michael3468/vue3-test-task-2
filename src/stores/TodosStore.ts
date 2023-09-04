import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuthorizationStore } from '.';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  creationTime: Date;
}

interface IEditableTodo {
  isEditable: boolean;
  todo_id: number | null;
}

export const useTodosStore = defineStore('TodosStore', () => {
  const authorizationStore = useAuthorizationStore();
  const todos = ref<ITodo[]>([]);
  const searchedTodos = ref<ITodo[]>([]);
  const isLoading = ref<boolean>(false);

  const editableTodo = ref<IEditableTodo>({ isEditable: false, todo_id: null });

  const fetchTodos = async () => {
    if (authorizationStore.user_id) {
      try {
        isLoading.value = true;

        const response = await fetch(
          `${import.meta.env.VITE_HOST}/users/${authorizationStore.user_id}/todos`,
        );

        todos.value = await response.json();
        searchedTodos.value = todos.value;
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    }
  };

  const removeToDo = (todoId: number) => {
    if (todos.value) {
      todos.value = todos.value.filter((todo) => {
        return todo.id !== todoId;
      });

      searchedTodos.value = todos.value;
    }
  };

  const addToDo = (newTodoInputRef: Ref<HTMLInputElement | null>) => {
    if (newTodoInputRef.value && authorizationStore.user_id) {
      const newTodo: ITodo = {
        userId: authorizationStore.user_id,
        id: todos.value?.length ? todos.value?.length + 1 : 1,
        title: newTodoInputRef.value.value,
        completed: false,
        creationTime: new Date(),
      };

      todos.value?.push(newTodo);

      newTodoInputRef.value.value = '';
      newTodoInputRef.value.focus();
    }
  };

  const searchTodo = (searchTodoInputRef: Ref<HTMLInputElement | null>) => {
    const searchText = searchTodoInputRef.value;

    if (searchText && todos.value) {
      searchedTodos.value = todos.value.filter((todo) => todo.title.includes(searchText.value));
    }
  };

  const isTodoEditable = (todoId: number) => {
    return editableTodo.value.isEditable && editableTodo.value.todo_id === todoId;
  };

  return {
    todos,
    isLoading,
    editableTodo,
    searchedTodos,
    fetchTodos,
    removeToDo,
    addToDo,
    searchTodo,
    isTodoEditable,
  };
});
