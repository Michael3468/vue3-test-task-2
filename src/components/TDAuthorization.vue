<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthorizationStore } from '../stores';
import router from '@/router';

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

const email = ref<string>('Sincere@april.biz');
const password = ref<string>('Bret');
const errorMessage = ref<string>('');

const authorizationStore = useAuthorizationStore();

async function login() {
  try {
    const response = await fetch(`${import.meta.env.VITE_HOST}/users?email=${email.value}`);
    const user: IUser = (await response.json())[0];

    if (user && user.username === password.value) {
      authorizationStore.logIn(user.id);
      router.push('/');
    } else {
      throw new Error('Email or password is not correct');
    }
  } catch (error) {
    errorMessage.value = (error as Error).message;
    console.log(error);
  }
}

const handleInputChange = () => {
  errorMessage.value = '';
};

onMounted(() => {
  authorizationStore.checkAuthorization();
});
</script>

<template>
  <div class="container">
    <div class="authorization" :class="authorizationStore.isUserAuthorized ? 'hidden' : ''">
      <h2 class="authorization-caption">authorization</h2>
      <div class="authorization-inputs">
        <input
          class="authorization-input"
          type="email"
          placeholder="email"
          v-model="email"
          @input="handleInputChange"
        />
        <input
          class="authorization-input"
          type="password"
          placeholder="use username as password"
          v-model="password"
          @input="handleInputChange"
        />
      </div>
      <p class="authorization-message">{{ errorMessage }}</p>
      <button class="authorization-button" @click="login">Log in</button>
    </div>
  </div>
</template>

<style lang="scss">
@import 'variables';
@import 'mixins';

.authorization {
  min-width: 320px;
  width: 320px;
  border: 1px solid black;
  border-radius: $border-radius;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;

  &-caption {
    margin-bottom: 20px;
  }

  &-inputs {
    display: flex;
    flex-direction: column;
    gap: 10px 0;
  }

  &-input {
    padding: 7px;
    border-radius: $border-radius;
  }

  &-message {
    margin-bottom: 20px;
  }

  &-button {
    @include authorization-button;
  }
}
</style>
