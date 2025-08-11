<script setup lang="ts">
import { useApp } from '@/providers/app/use-app';
import { useAuth } from '@/providers/auth/use-auth';

const { user } = useApp();
const { logout } = useAuth();
</script>

<template>
  <el-button v-if="!!user" @click="logout" type="danger">sair</el-button>
</template>
