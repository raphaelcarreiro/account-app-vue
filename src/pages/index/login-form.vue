<script lang="ts" setup>
import type { Credential } from '@/providers/auth/use-auth';
import { ref } from 'vue';
import type { LoginValidation } from './validation/use-login.validation';

type Emits = {
  onSubmit: [credential: Credential];
};

type Props = {
  validation: LoginValidation;
  loading: boolean;
};

const email = ref('');
const password = ref('');
const emit = defineEmits<Emits>();
const props = defineProps<Props>();

function onSubmit() {
  emit('onSubmit', {
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <el-form @submit.prevent="onSubmit" label-position="top">
    <el-form-item label="E-mail" :error="props.validation?.email">
      <el-input v-model="email" placeholder="e-mail" autofocus />
    </el-form-item>

    <el-form-item label="Senha" :error="props.validation?.password">
      <el-input v-model="password" type="password" placeholder="senha" show-password />
    </el-form-item>

    <el-button :loading="props.loading" native-type="submit" type="primary">entrar</el-button>
  </el-form>
</template>

<style scoped>
form {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
