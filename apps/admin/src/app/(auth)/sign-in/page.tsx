'use client';

import { SignInFormInput, SignInFormSchema } from '@mns/utils';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import {
  Bounded,
  Checkbox,
  Field,
  FieldError,
  FieldLabel,
  FormTextField,
  LoadingSpinner,
  SubmitButton,
} from '@mns/ui';

const SignInPage = () => {
  const router = useRouter();

  const form = useForm<SignInFormInput>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<SignInFormInput> = async (data) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      },
      {
        onSuccess: () => {
          router.push('/');
        },
      },
    );
  };

  return (
    <Bounded
      isCenterd={false}
      size="full"
      as="main"
      className="min-h-screen flex flex-col justify-center items-center"
    >
      <Bounded
        as="form"
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx('flex flex-col gap-y-4 border p-6 md:min-w-100')}
      >
        <p className="font-semibold text-center">mns. Admin</p>

        <FormTextField
          name="email"
          type="email"
          autoComplete="email"
          control={form.control}
          label="Email"
        />

        <FormTextField
          name="password"
          type="password"
          control={form.control}
          label="Password"
        />

        <Controller
          name="rememberMe"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              orientation="horizontal"
              data-invalid={fieldState.invalid}
              className="w-fit self-start"
            >
              <Checkbox
                name={field.name}
                checked={!!field.value}
                onCheckedChange={field.onChange}
                id="remember"
              />
              <FieldLabel htmlFor="remember">Remember Me</FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <SubmitButton disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner /> : 'Sign In'}
          </SubmitButton>
        </Field>
      </Bounded>
    </Bounded>
  );
};

export default SignInPage;
