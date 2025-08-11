import type { Socket } from 'socket.io-client';
import { inject, type InjectionKey, type Ref } from 'vue';

export interface SocketContext {
  connected: Ref<boolean>;
  socket: Ref<Socket | null>;
  connect: () => void;
  disconnect: () => void;
}

export const socketProviderKey: InjectionKey<SocketContext> = Symbol('socket');

export function useSocket(): SocketContext {
  const context = inject(socketProviderKey);

  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }

  return context;
}
