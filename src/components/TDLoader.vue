<script setup lang="ts">
interface Props {
  isLoading: boolean;
}

defineProps<Props>();
</script>

<template>
  <div :class="isLoading ? '' : 'hidden'">
    <h2>Loading...</h2>
  </div>
</template>
