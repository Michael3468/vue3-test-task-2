import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthorizationStore = defineStore('AuthorizationStore', () => {
  const isUserAuthorized = ref<boolean>(false);
  const user_id = ref<number | null>(null);
  const key = 'user_id';

  const saveAuthorization = (userId: number) => {
    localStorage.setItem(key, userId.toString());
  };

  const removeAuthorization = () => {
    localStorage.removeItem(key);
  };

  const checkAuthorization = () => {
    const value = localStorage.getItem(key);

    if (value) {
      isUserAuthorized.value = true;
      user_id.value = Number(value);
    }
  };

  const logIn = (userId: number) => {
    isUserAuthorized.value = true;
    user_id.value = userId;
    saveAuthorization(userId);
  };

  const logOut = () => {
    isUserAuthorized.value = false;
    user_id.value = null;
    removeAuthorization();
  };

  return {
    isUserAuthorized,
    user_id,
    checkAuthorization,
    logIn,
    logOut,
  };
});
