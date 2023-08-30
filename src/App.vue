<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@import 'variables';

.content {
  background-color: $color;
}
</style>
