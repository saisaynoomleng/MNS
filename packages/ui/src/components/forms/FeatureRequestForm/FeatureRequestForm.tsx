'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FeatureRequestFormSchema,
  type ActionResponse,
  type FeatureRequestFormInput,
} from '@mns/utils';
import clsx from 'clsx';
import type React from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import {
  FormTextareaField,
  LoadingSpinner,
  SectionTitle,
  SubmitButton,
} from '../../shared';
import { Field, FieldLabel, FieldError } from '#components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/ui/select';

type FeatureRequestFormProps = {
  className?: string;
  action: (
    data: FeatureRequestFormInput,
  ) => Promise<ActionResponse<FeatureRequestFormInput>>;
  userName: string;
  apps: App[];
  userId: string;
};

type App = {
  _id: string;
  name: string;
};

export const FeatureRequestForm = ({
  className,
  action,
  userName,
  apps,
  userId,
}: FeatureRequestFormProps): React.JSX.Element => {
  const form = useForm<FeatureRequestFormInput>({
    resolver: zodResolver(FeatureRequestFormSchema),
    defaultValues: {
      userName,
      appName: '',
      appId: '',
      body: '',
      userId,
    },
  });

  const onSubmit: SubmitHandler<FeatureRequestFormInput> = async (data) => {
    await action(data);
    form.reset();
  };

  return (
    <form
      noValidate
      className={twMerge(clsx('generic-form', className))}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <SectionTitle as="h3">Request a feature</SectionTitle>

      <Controller
        name="appId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field orientation="responsive" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="apps">Choose an App</FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger id="apps" aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Select an app" />
              </SelectTrigger>

              <SelectContent position="item-aligned">
                {apps.map((app) => (
                  <SelectItem key={app._id} value={app._id}>
                    {app.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <FormTextareaField
        name="body"
        description="Clear description helps us define what you need"
        label="Feature Description"
        control={form.control}
        maxLength={5000}
      />

      <Field orientation="horizontal">
        <SubmitButton disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <LoadingSpinner /> : 'Request'}
        </SubmitButton>
      </Field>
    </form>
  );
};
