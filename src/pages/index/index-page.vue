<script lang="ts" setup>
import { useNotification } from '@/pages/index/hooks/use-notification';
import LogoutButton from './logout-button.vue';
import LoginView from './login.vue';

useNotification();
</script>

<template>
  <main>
    <LoginView />
    <LogoutButton />
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
