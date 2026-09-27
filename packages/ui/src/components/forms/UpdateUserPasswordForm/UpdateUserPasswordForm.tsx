'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateUserPasswordFormSchema,
  type UpdateUserPassowrdFormInput,
} from '@mns/utils';
import clsx from 'clsx';
import type React from 'react';
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import {
  FormTextField,
  PasswordChecker,
  SectionTitle,
  SubmitButton,
} from '../../shared';
import { Field, FieldError, FieldLabel } from '#components/ui/field';
import { Checkbox } from '#components/ui/checkbox';
import { Separator } from '#components/ui/separator';

type UpdateUserPasswordFormProps = {
  className?: string;
  action: (data: UpdateUserPassowrdFormInput) => Promise<void>;
};

export const UpdateUserPasswordForm = ({
  className,
  action,
}: UpdateUserPasswordFormProps): React.JSX.Element => {
  const form = useForm<UpdateUserPassowrdFormInput>({
    resolver: zodResolver(UpdateUserPasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      revokeSession: false,
    },
  });

  const onSubmit: SubmitHandler<UpdateUserPassowrdFormInput> = async (data) => {
    await action(data);
    form.reset();
  };

  const password = useWatch({ control: form.control, name: 'newPassword' });

  return (
    <form
      noValidate
      className={twMerge(clsx('generic-form', className))}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <SectionTitle as="h3">Update Password</SectionTitle>

      <FormTextField
        name="currentPassword"
        type="password"
        control={form.control}
        label="Current Password"
      />

      <FormTextField
        name="newPassword"
        label="New Password"
        type="password"
        control={form.control}
      />

      <FormTextField
        name="confirmNewPassword"
        label="Confirm New Password"
        type="password"
        control={form.control}
      />

      <Controller
        name="revokeSession"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            orientation="horizontal"
            className="w-fit"
          >
            <Checkbox
              name={field.name}
              checked={!!field.value}
              onCheckedChange={field.onChange}
              id="revokeSession"
              aria-invalid={fieldState.invalid}
            />
            <FieldLabel htmlFor="revokeSession">
              Sign out of other devices?
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Separator className="bg-muted" />

      <PasswordChecker password={password} />

      <Field orientation="horizontal">
        <SubmitButton>Update Password</SubmitButton>
      </Field>
    </form>
  );
};
