import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
// eslint-disable-next-line import/no-cycle
import { useAuthorizationStore } from '.';

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  createdTime: Date;
  expirationTime: Date;
  isExpired: boolean;
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
  const sText = ref<string>('');

  const editableTodo = ref<IEditableTodo>({ isEditable: false, todo_id: null });

  const startCheckingExpiration = () => {
    setInterval(() => {
      const now = Date.now();

      searchedTodos.value = searchedTodos.value.map((todo) => {
        if (todo.expirationTime && todo.expirationTime.getTime() < now) {
          return { ...todo, isExpired: true };
        }
        return todo;
      });
    }, 1000);
  };

  const fetchTodos = async () => {
    if (authorizationStore.user_id) {
      try {
        isLoading.value = true;

        const response = await fetch(
          `${import.meta.env.VITE_HOST}/users/${authorizationStore.user_id}/todos`,
        );

        todos.value = await response.json();
        searchedTodos.value = todos.value;
        startCheckingExpiration();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    }
  };

  const searchTodo = (searchText: string) => {
    if (todos.value) {
      sText.value = searchText;
      searchedTodos.value = todos.value.filter((todo) => todo.title.includes(searchText));
    }
  };

  const removeToDo = (todoId: number) => {
    if (todos.value) {
      todos.value = todos.value.filter((todo) => {
        return todo.id !== todoId;
      });

      searchTodo(sText.value);
    }
  };

  const addToDo = (newTodoInputRef: Ref<HTMLInputElement | null>, expirationTime: Date) => {
    if (newTodoInputRef.value && authorizationStore.user_id && todos.value) {
      const todosLength = todos.value.length;

      const newTodo: ITodo = {
        userId: authorizationStore.user_id,
        id: todosLength ? todosLength + 1 : 1,
        title: newTodoInputRef.value.value,
        completed: false,
        createdTime: new Date(),
        expirationTime,
        isExpired: false,
      };

      const isTodoExist = todos.value.filter((todo) => todo.title === newTodo.title).length > 0;
      if (!isTodoExist) {
        todos.value.push(newTodo);
        searchTodo(sText.value);
      } else {
        // eslint-disable-next-line no-alert
        alert(`Todo with title "${newTodo.title}" already exist`);
      }

      const inputValueRef = newTodoInputRef.value;
      if (inputValueRef) {
        inputValueRef.value = '';
        inputValueRef.focus();
      }
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
