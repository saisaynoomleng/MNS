'use client';

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '#components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '#components/ui/input-group';
import {} from '@base-ui/react';
import { useId, type ComponentPropsWithoutRef } from 'react';
import type React from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export type FormTextareaFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  maxLength?: number;
  description?: string;
  minLength?: number;
} & Omit<
  ComponentPropsWithoutRef<'textarea'>,
  | 'name'
  | 'maxLength'
  | 'onBlur'
  | 'onChange'
  | 'arai-invalid'
  | 'id'
  | 'value'
  | 'defaultValue'
  | 'ref'
  | 'minLength'
>;

export const FormTextareaField = <T extends FieldValues>({
  name,
  label,
  control,
  className,
  maxLength = 3000,
  description,
  minLength = 10,
  ...props
}: FormTextareaFieldProps<T>): React.JSX.Element => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={twMerge(className)}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}

          <InputGroup>
            <InputGroupTextarea
              {...props}
              {...field}
              id={id}
              aria-invalid={fieldState.invalid}
              minLength={minLength}
              maxLength={maxLength}
            />

            <InputGroupAddon align="block-end">
              <InputGroupText className="">
                {field.value.length} / {maxLength}
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
