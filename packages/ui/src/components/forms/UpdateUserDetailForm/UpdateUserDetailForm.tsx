'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateUserDetailFormSchema,
  type ActionResponse,
  type UpdateUserDetailFormInput,
} from '@mns/utils';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField, SectionTitle, SubmitButton } from '../../shared';
import { Field } from '#components/ui/field';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type UpdateUserDetailFormProps = {
  className?: string;
  userDetail?: UpdateUserDetailFormInput;
  updateAction: (
    data: UpdateUserDetailFormInput,
  ) => Promise<ActionResponse<UpdateUserDetailFormInput>>;
};

export const UpdateUserDetailForm = ({
  className,
  userDetail,
  updateAction,
}: UpdateUserDetailFormProps): React.JSX.Element => {
  const form = useForm<UpdateUserDetailFormInput>({
    resolver: zodResolver(UpdateUserDetailFormSchema),
    defaultValues: {
      name: userDetail?.name ?? '',
      companyName: userDetail?.companyName ?? '',
      position: userDetail?.position ?? '',
    },
  });

  const onSubmit: SubmitHandler<UpdateUserDetailFormInput> = async (data) => {
    await updateAction(data);
  };

  return (
    <form
      className={twMerge(clsx('generic-form', className))}
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <SectionTitle as="h3">Update Information</SectionTitle>

      <FormTextField
        name="name"
        type="text"
        label="Name"
        control={form.control}
      />

      <FormTextField
        name="companyName"
        label="Company Name"
        description="Company Name is optional"
        type="text"
        control={form.control}
      />

      <FormTextField
        name="position"
        type="text"
        label="Current Position"
        description="Current Position is optional"
        control={form.control}
      />

      <Field orientation="horizontal">
        <SubmitButton>Update</SubmitButton>
      </Field>
    </form>
  );
};
