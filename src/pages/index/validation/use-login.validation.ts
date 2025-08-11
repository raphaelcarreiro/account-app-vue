import type { Credential } from '@/providers/auth/use-auth';
import { ref } from 'vue';
import * as yup from 'yup';

export interface LoginValidation {
  email?: string;
  password?: string;
}

export function useLoginValidation() {
  const validation = ref<LoginValidation>({});

  const schema = yup.object().shape({
    email: yup.string().required('o e-mail é obrigatório').email('e-mail inválido'),
    password: yup.string().required('a senha é obrigatória'),
  });

  const run = async (credential: Credential) => {
    await schema.validate(credential, { abortEarly: false });
    validation.value = {};
  };

  const onError = (error: yup.ValidationError) => {
    const errors: LoginValidation = {};

    error.inner.forEach(error => {
      if (error.path) {
        errors[error.path as keyof LoginValidation] = error.message;
      }
    });

    validation.value = errors;
  };

  const validate = async (credential: Credential) => {
    try {
      await run(credential);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        onError(err);
      }

      throw err;
    }
  };

  return {
    validation,
    validate,
  };
}
