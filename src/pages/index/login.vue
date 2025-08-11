<script lang="ts" setup>
import { useAuth, type Credential } from '@/providers/auth/use-auth';
import LoginForm from '../index/login-form.vue';
import { ref } from 'vue';
import { useLoginValidation } from './validation/use-login.validation';
import { useApp } from '@/providers/app/use-app';

const { login } = useAuth();
const loading = ref(false);
const { validation, validate } = useLoginValidation();
const { user } = useApp();

function handleSubmit(credential: Credential) {
  validate(credential).then(() => handleLogin(credential));
}

function handleLogin(credential: Credential) {
  loading.value = true;

  login(credential)
    .catch(error => {
      validation.value = {
        email: error.message,
        password: error.message,
      };
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <LoginForm v-if="!user" :loading :validation="validation" @on-submit="handleSubmit" />
</template>
