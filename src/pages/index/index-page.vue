<script lang="ts" setup>
import { useNotification } from '@/pages/index/hooks/use-notification';
import LogoutButton from './logout-button.vue';
import Login from './login.vue';
import SplashScreen from './splash-screen.vue';

useNotification();
</script>

<template>
  <main>
    <SplashScreen />
    <Login />
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
