<script setup lang="ts">
import { useAuth } from '@/providers/auth/use-auth';

const { isLoading } = useAuth();
</script>

<template>
  <div v-if="isLoading" class="container">
    <span>carregando...</span>
  </div>
</template>

<style scoped>
.container {
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

.container > span {
  position: absolute;
  top: 30%;
}
</style>
