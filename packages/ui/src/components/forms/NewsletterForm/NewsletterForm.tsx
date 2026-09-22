'use client';

import {
  NewsletterFormSchema,
  type ActionResponse,
  type NewsletterFormInput,
  type NewsletterFormOutput,
} from '@mns/utils';
import type React from 'react';
import {
  FormTextField,
  LoadingSpinner,
  SectionTitle,
  SubmitButton,
} from '../../shared';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { toast } from 'sonner';
import { Field } from '#components/ui/field';

type NewsletterFormProps = {
  action: (
    data: NewsletterFormInput,
  ) => Promise<ActionResponse<NewsletterFormOutput>>;
  className?: string;
};

export const NewsletterForm = ({
  action,
  className,
}: NewsletterFormProps): React.JSX.Element => {
  const form = useForm<NewsletterFormInput>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<NewsletterFormInput> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);
      return form.setError('email', {
        message: result.message,
      });
    }

    toast.success(result.message);
    form.reset();
  };

  return (
    <form
      className={twMerge(
        clsx('flex flex-col gap-y-4 primary-box-shadow border p-6', className),
      )}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <SectionTitle as="h3">Stay in the loop</SectionTitle>
        <p className="text-fs-300">
          Get occasional updates, creative insights, and things we're building
          at
          <span className="font-semibold"> mns. </span>
          straight to your inbox.
        </p>
      </div>

      <FormTextField
        label="Email"
        name="email"
        control={form.control}
        autoComplete="email"
        type="email"
      />

      <Field orientation="horizontal">
        <SubmitButton disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <LoadingSpinner /> : 'Subscribe'}
        </SubmitButton>
      </Field>
    </form>
  );
};
