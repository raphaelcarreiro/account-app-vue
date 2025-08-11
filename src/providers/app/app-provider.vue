<script setup lang="ts">
import type { User } from '@/pages/index/types/user';
import { provide, ref } from 'vue';
import { appProviderKey, type AppContext } from './use-app';

const user = ref<User | null>(null);

function setUser(value: User | null) {
  user.value = value;
}

provide<AppContext>(appProviderKey, { user, setUser });
</script>

<template>
  <slot></slot>
</template>
