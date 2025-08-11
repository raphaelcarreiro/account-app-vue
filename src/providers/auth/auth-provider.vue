<script setup lang="ts">
import type { AxiosError } from 'axios';
import { authProviderKey, type AuthContext, type Credential } from './use-auth';
import { api } from '@/services/api';
import { useApp } from '../app/use-app';
import { onMounted, provide, ref, watch } from 'vue';

const { setUser } = useApp();
const isLoading = ref(true);
const isUserOn = ref(false);

onMounted(() => {
  refreshToken();
});

watch(
  () => isUserOn.value,
  value => (value ? whoami() : setUser(null)),
);

async function refreshToken(): Promise<void> {
  try {
    await api.post('/refresh-token');
    isUserOn.value = true;
  } catch {
    isLoading.value = false;
  }
}

async function whoami(): Promise<void> {
  api
    .get('/whoami')
    .then(async response => {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUser(response.data);
    })
    .finally(() => (isLoading.value = false));
}

async function login(credential: Credential) {
  const tryLogin = async (credential: Credential) => {
    await api.post('/login', credential);
    isUserOn.value = true;
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
  isUserOn.value = false;
}

provide<AuthContext>(authProviderKey, {
  login,
  logout,
  isLoading,
});
</script>

<template>
  <slot></slot>
</template>
