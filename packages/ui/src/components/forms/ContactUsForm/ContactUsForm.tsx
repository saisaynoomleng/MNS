'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ContactUsFormSchema,
  type ActionResponse,
  type ContactUsFormInput,
  type ContactUsFormOutput,
} from '@mns/utils';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import {
  FormTextareaField,
  FormTextField,
  LoadingSpinner,
  SectionTitle,
  SubmitButton,
} from '../../shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Field } from '#components/ui/field';

type ContactUsFormProps = {
  className?: string;
  action: (
    data: ContactUsFormInput,
  ) => Promise<ActionResponse<ContactUsFormOutput>>;
};

export const ContactUsForm = ({
  className,
  action,
}: ContactUsFormProps): React.JSX.Element => {
  const form = useForm<ContactUsFormInput>({
    resolver: zodResolver(ContactUsFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      companyName: '',
      minBudget: 0,
      maxBudget: 0,
    },
  });

  const onSubmit: SubmitHandler<ContactUsFormInput> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);
      return form.setError(result.field as keyof ContactUsFormInput, {
        message: result.message,
      });
    }

    toast.success(result.message);
    form.reset();
  };

  return (
    <form
      noValidate
      className={twMerge(
        clsx(
          'grid md:grid-cols-2 md:gap-x-6 p-6 border primary-box-shadow gap-y-4 md:gap-y-6',
          className,
        ),
      )}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="col-span-full">
        <SectionTitle>Let&apos;s talk</SectionTitle>
        <p>
          Tell us what you're building and we'll get back to you within one
          business day.
        </p>
      </div>

      <FormTextField
        label="Name"
        name="name"
        control={form.control}
        autoComplete="name"
        type="text"
      />

      <FormTextField
        name="email"
        label="Email"
        control={form.control}
        autoComplete="email"
        type="email"
      />

      <FormTextField
        name="companyName"
        label="Company"
        description="Company is optional"
        control={form.control}
        type="text"
        className="col-span-full"
      />

      <FormTextField
        name="minBudget"
        label="Minimum Budget"
        control={form.control}
        type="number"
      />

      <FormTextField
        name="maxBudget"
        label="Maximum Budget"
        control={form.control}
        type="number"
      />

      <FormTextareaField
        name="message"
        label="Message"
        control={form.control}
        maxLength={3000}
        className="col-span-full"
      />

      <Field orientation="horizontal">
        <SubmitButton disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <LoadingSpinner data-testid="spinner" />
          ) : (
            'Submit'
          )}
        </SubmitButton>
      </Field>
    </form>
  );
};
