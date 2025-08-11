import { inject, type InjectionKey, type Ref } from 'vue';
import type { User } from '@/pages/index/types/user';

export interface AppContext {
  user: Ref<User | null>;
  setUser: (value: User | null) => void;
}

export const appProviderKey: InjectionKey<AppContext> = Symbol('app');

export function useApp(): AppContext {
  const context = inject(appProviderKey);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  return context;
}
