'use client';

import {
  SignInFormSchema,
  type OAuthProviders,
  type SignInFormInput,
} from '@mns/utils';
import type React from 'react';
import { FormTextField, SectionTitle, SubmitButton } from '../../shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '#components/ui/field';
import { OAuthSignInForm } from '../OAuthSignInForm/OAuthSignInForm';
import { Checkbox } from '#components/ui/checkbox';

type SignInFormProps = {
  className?: string;
  action: (data: SignInFormInput) => Promise<void>;
  OAuthAction: (strategy: OAuthProviders) => Promise<void>;
};

export const SignInForm = ({
  className,
  action,
  OAuthAction,
}: SignInFormProps): React.JSX.Element => {
  const form = useForm<SignInFormInput>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSignIn: SubmitHandler<SignInFormInput> = async (data) => {
    await action(data);
  };

  return (
    <form
      noValidate
      className={twMerge(
        clsx('flex flex-col gap-y-4 p-6 primary-box-shadow border', className),
      )}
      onSubmit={form.handleSubmit(onSignIn)}
    >
      <div className="space-y-1">
        <SectionTitle as="h3">Welcome back</SectionTitle>
        <p>Sign in to manage your apps, subscriptions, and account.</p>
      </div>

      <FormTextField
        name="email"
        label="Email"
        type="email"
        control={form.control}
      />

      <FormTextField
        name="password"
        label="Password"
        type="password"
        control={form.control}
      />

      <Controller
        name="rememberMe"
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldGroup>
            <Field aria-invalid={fieldState.invalid} orientation="horizontal">
              <Checkbox
                name={field.name}
                onCheckedChange={field.onChange}
                checked={!!field.value}
                id="remember"
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel htmlFor="remember">Remember Me</FieldLabel>
            </Field>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldGroup>
        )}
      />

      <Field orientation="horizontal">
        <SubmitButton>Sign In</SubmitButton>
      </Field>

      <FieldSeparator>Or</FieldSeparator>

      <OAuthSignInForm action={OAuthAction} />
    </form>
  );
};
