<script setup lang="ts">
import IndexPage from './pages/index/index-page.vue';
import AppProvider from './providers/app/app-provider.vue';
import AuthProvider from './providers/auth/auth-provider.vue';
import SocketProvider from './providers/socket/socket-provider.vue';
</script>

<template>
  <AppProvider>
    <SocketProvider>
      <AuthProvider>
        <IndexPage />
      </AuthProvider>
    </SocketProvider>
  </AppProvider>
</template>
