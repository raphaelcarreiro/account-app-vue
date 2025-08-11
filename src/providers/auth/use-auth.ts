import { inject, type InjectionKey, type Ref } from 'vue';

export interface Credential {
  email: string;
  password: string;
}

export interface AuthContext {
  login(credential: Credential): Promise<void>;
  logout(): void;
  isRefreshing: Ref<boolean>;
}

export const authProviderKey: InjectionKey<AuthContext> = Symbol('auth');

export function useAuth(): AuthContext {
  const context = inject(authProviderKey);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
