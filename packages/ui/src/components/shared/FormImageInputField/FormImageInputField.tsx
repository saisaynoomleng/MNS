'use client';

import { Attachment, AttachmentMedia } from '#components/ui/attachment';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import {
  useEffect,
  useId,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import type React from 'react';
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
  type UseFormClearErrors,
  type UseFormSetError,
} from 'react-hook-form';
import { CiImageOn } from 'react-icons/ci';
import {
  ALLOWED_IMAGE_TYPES,
  isImageTooLarge,
  type ImageResponse,
} from '@mns/utils';

export type FormImageInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  description?: string;
  setErrorMessage: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  maxSize?: number;
} & Omit<
  ComponentPropsWithoutRef<'input'>,
  | 'name'
  | 'aria-invalid'
  | 'defaultValue'
  | 'id'
  | 'ref'
  | 'onBlur'
  | 'value'
  | 'type'
  | 'accept'
>;

export const FormImageInputField = <T extends FieldValues>({
  name,
  control,
  label,
  description,
  onChange,
  maxSize,
  setErrorMessage,
  clearErrors,
  ...props
}: FormImageInputFieldProps<T>): React.JSX.Element => {
  const id = useId();

  const { field, fieldState } = useController({ name, control });

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!field.value && !(field.value.files?.[0] instanceof File)) {
      setPreviewSrc(null);
      return undefined;
    }

    const url = URL.createObjectURL(field.value);
    setPreviewSrc(url);

    return () => URL.revokeObjectURL(url);
  }, [field.value]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    const file = e.target.files?.[0];

    if (!file) {
      field.onChange(null);
      return setErrorMessage(name, {
        type: 'manual',
        message: 'Please Upload an image',
      });
    }

    const result = validateImage(file, maxSize);

    if (!result.success) {
      e.target.value = '';
      field.onChange(null);

      return setErrorMessage(name, {
        type: 'manual',
        message: result.message,
      });
    }

    field.onChange(result.file);
    clearErrors(name);
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}

      <Attachment>
        {previewSrc ? (
          <AttachmentMedia variant="image">
            <img src={previewSrc as string} alt="" />
          </AttachmentMedia>
        ) : (
          <AttachmentMedia variant="icon">
            <CiImageOn aria-hidden />
          </AttachmentMedia>
        )}
      </Attachment>

      <Input
        {...props}
        name={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        onChange={handleOnchange}
        type="file"
        accept="image/*"
        id={id}
        aria-invalid={fieldState.invalid}
      />

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};

const validateImage = (file: File, maxSize = 1): ImageResponse => {
  if (isImageTooLarge(file.size, maxSize)) {
    return {
      success: false,
      message: `Image size cannot exceeds ${maxSize} MB`,
    };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      success: false,
      message: 'Only accept images',
    };
  }

  return {
    success: true,
    file,
  };
};
