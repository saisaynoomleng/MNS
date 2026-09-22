'use client';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import { useId, type ComponentPropsWithoutRef } from 'react';
import type React from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export type FormTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  type: React.HTMLInputTypeAttribute;
  description?: string;
} & Omit<
  ComponentPropsWithoutRef<'input'>,
  | 'name'
  | 'autoComplete'
  | 'type'
  | 'id'
  | 'aria-invalid'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onBlur'
  | 'ref'
>;

export const FormTextField = <T extends FieldValues>({
  name,
  control,
  label,
  autoComplete,
  type,
  description,
  className,
  ...props
}: FormTextFieldProps<T>): React.JSX.Element => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={twMerge(className)}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}

          <Input
            {...props}
            {...field}
            type={type}
            id={id}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
