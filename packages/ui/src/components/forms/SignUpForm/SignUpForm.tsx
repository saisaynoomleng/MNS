'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignUpFormSchema,
  type CallToActionProps,
  type OAuthProviders,
  type SignUpFormInput,
} from '@mns/utils';
import clsx from 'clsx';
import type React from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import {
  FormTextField,
  PasswordChecker,
  SectionTitle,
  SubmitButton,
} from '../../shared';
import { Field, FieldSeparator } from '#components/ui/field';
import { OAuthSignInForm } from '../OAuthSignInForm';

type SignUpFormProps = {
  className?: string;
  action: (data: SignUpFormInput) => Promise<void>;
  OAuthAction: (strategy: OAuthProviders) => Promise<void>;
  callToAction: CallToActionProps;
  renderAction: (props: CallToActionProps) => React.ReactElement;
};

export const SignUpForm = ({
  className,
  action,
  OAuthAction,
  callToAction,
  renderAction,
}: SignUpFormProps): React.JSX.Element => {
  const form = useForm<SignUpFormInput>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const inputPassword = useWatch({ control: form.control, name: 'password' });

  const onSignUp: SubmitHandler<SignUpFormInput> = async (data) => {
    await action(data);
  };

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSignUp)}
      className={twMerge(
        clsx('p-6 primary-box-shadow flex flex-col gap-y-4 border', className),
      )}
    >
      <div className="space-y-1">
        <SectionTitle as="h3">Create your account</SectionTitle>
        <p>
          Set up your MNS account to start using Plug & Play or Enterprise
          services.
        </p>
      </div>

      <FormTextField
        name="name"
        label="Name"
        control={form.control}
        type="text"
        autoComplete="name"
      />

      <FormTextField
        name="email"
        label="Email"
        type="email"
        control={form.control}
        autoComplete="email"
      />

      <FormTextField
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        control={form.control}
      />

      <FormTextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        autoComplete="current-password"
        control={form.control}
      />

      <PasswordChecker password={inputPassword} />

      <Field orientation="horizontal">
        <SubmitButton>Sign Up</SubmitButton>
      </Field>

      <div className="ml-auto flex gap-x-1 items-center">
        <p>Already a member?</p>

        {renderAction({ label: callToAction.label, href: callToAction.href })}
      </div>

      <FieldSeparator>Or Sign In With</FieldSeparator>

      <OAuthSignInForm action={OAuthAction} />
    </form>
  );
};
