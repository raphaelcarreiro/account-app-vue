<script setup lang="ts">
const socketUrl = import.meta.env.VITE_SOCKET_URL;
import { onUnmounted, provide, ref, watch, type Ref } from 'vue';
import { useApp } from '../app/use-app';
import { io, type Socket } from 'socket.io-client';
import { socketProviderKey } from './use-socket';

const { user } = useApp();
const connected = ref(false);
const socket = ref<Socket | null>(null);

function intialize() {
  socket.value = io(socketUrl, {
    withCredentials: true,
    transports: ['websocket'],
  });

  socket.value.on('connect', () => {
    connected.value = true;
  });

  socket.value.on('disconnect', () => {
    connected.value = false;
  });
}

function connect() {
  if (socket.value) {
    socket.value.connect();
    return;
  }

  intialize();
}

function disconnect() {
  socket.value?.disconnect();
  socket.value = null;
  connected.value = false;
}

watch(
  () => user.value,
  user => (user ? connect() : disconnect()),
);

onUnmounted(disconnect);

provide(socketProviderKey, {
  connect,
  disconnect,
  socket: socket as Ref<Socket | null>,
  connected,
});
</script>

<template>
  <slot></slot>
</template>
