<script setup lang="ts">
import type { AxiosError } from 'axios';
import { authProviderKey, type AuthContext, type Credential } from './use-auth';
import { api } from '@/services/api';
import { useApp } from '../app/use-app';
import { onMounted, provide, ref } from 'vue';

const { setUser } = useApp();
const isRefreshing = ref(false);

onMounted(() => {
  refreshToken();
});

async function refreshToken() {
  isRefreshing.value = true;

  try {
    const response = await api.post('/refresh-token');
    setUser(response.data);
  } finally {
    isRefreshing.value = false;
  }
}

async function login(credential: Credential) {
  const tryLogin = async (credential: Credential) => {
    const response = await api.post('/login', credential);
    setUser(response.data);
  };

  const onError = (err: unknown) => {
    const error = err as AxiosError;

    if (error.response?.status === 401) {
      throw new Error('Usuário ou senha inválidos');
    }

    throw error;
  };

  try {
    await tryLogin(credential);
  } catch (err) {
    onError(err);
  }
}

async function logout() {
  await api.post('/logout');
  setUser(null);
}

provide<AuthContext>(authProviderKey, {
  login,
  logout,
  isRefreshing,
});
</script>

<template>
  <slot></slot>
</template>
