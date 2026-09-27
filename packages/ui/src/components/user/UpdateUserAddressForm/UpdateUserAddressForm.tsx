'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  UpdateUserAddressFormSchema,
  type ActionResponse,
  type UpdateUserAddressFormInput,
} from '@mns/utils';
import clsx from 'clsx';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import {
  FormTextField,
  LoadingSpinner,
  SectionTitle,
  SubmitButton,
} from '../../shared';
import { Field } from '#components/ui/field';

type UpdateUserAddressFormProps = {
  className?: string;
  action: (
    data: UpdateUserAddressFormInput,
  ) => Promise<ActionResponse<UpdateUserAddressFormInput>>;
  address?: UpdateUserAddressFormInput;
};

export const UpdateUserAddressForm = ({
  className,
  action,
  address,
}: UpdateUserAddressFormProps) => {
  const form = useForm<UpdateUserAddressFormInput>({
    resolver: zodResolver(UpdateUserAddressFormSchema),
    defaultValues: {
      address1: address?.address1 ?? '',
      address2: address?.address2 ?? '',
      city: address?.city ?? '',
      zip: address?.zip ?? '',
      state: address?.state ?? '',
      country: address?.country ?? '',
    },
  });

  const onSubmit: SubmitHandler<UpdateUserAddressFormInput> = async (data) => {
    await action(data);
    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <form
      noValidate
      className={twMerge(clsx('generic-form', className))}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <SectionTitle as="h3">Update Address</SectionTitle>

      <FormTextField
        name="address1"
        label="Street Address 1"
        type="text"
        control={form.control}
        autoComplete="address-line1"
      />

      <FormTextField
        name="address2"
        label="Street Address 2"
        type="text"
        control={form.control}
        autoComplete="address-line2"
      />

      <FormTextField
        name="city"
        label="City"
        type="text"
        control={form.control}
        autoComplete="address-level2"
      />

      <FormTextField
        name="state"
        label="State"
        type="text"
        control={form.control}
        autoComplete="address-level1"
      />

      <FormTextField
        name="zip"
        label="Zip/Postal Code"
        type="text"
        control={form.control}
        autoComplete="postal-code"
      />

      <FormTextField
        name="country"
        label="Country"
        type="text"
        control={form.control}
        autoComplete="country"
      />

      <Field orientation="horizontal">
        <SubmitButton disabled={isSubmitting} data-testid="submit">
          {isSubmitting ? <LoadingSpinner /> : 'Update'}
        </SubmitButton>
      </Field>
    </form>
  );
};
