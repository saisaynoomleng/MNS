'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangeEmailFormSchema,
  RequestEmailChangeFormSchema,
  type ChangeEmailFormInput,
  type RequestEmailChangeFormInput,
} from '@mns/utils';
import { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import {
  Bounded,
  FormTextField,
  SectionTitle,
  SubmitButton,
} from '../../shared';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Field, FieldError, FieldLabel } from '#components/ui/field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '#components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '#components/ui/button';

type ChangeEmailFormProps = {
  className?: string;
  requestAction: (data: RequestEmailChangeFormInput) => Promise<void>;
  changeAction: (data: ChangeEmailFormInput) => Promise<void>;
  currentEmail: string;
};

export const ChangeEmailForm = ({
  className,
  currentEmail,
  requestAction,
  changeAction,
}: ChangeEmailFormProps): React.JSX.Element => {
  const [isSentRequest, setIsSentRequest] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(0);
  const disableResend = cooldown > 0;

  useEffect(() => {
    if (cooldown <= 0) return;

    const id = setTimeout(() => {
      setCooldown((c) => c - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [cooldown]);

  const requestForm = useForm<RequestEmailChangeFormInput>({
    resolver: zodResolver(RequestEmailChangeFormSchema),
    defaultValues: {
      currentEmail,
      newEmail: '',
    },
  });

  const changeForm = useForm<ChangeEmailFormInput>({
    resolver: zodResolver(ChangeEmailFormSchema),
    defaultValues: {
      newEmail: '',
      otp: '',
    },
  });

  const submitRequest: SubmitHandler<RequestEmailChangeFormInput> = async (
    data,
  ) => {
    await requestAction(data);
    changeForm.setValue('newEmail', data.newEmail);
    setIsSentRequest(true);
  };

  const submitChange: SubmitHandler<ChangeEmailFormInput> = async (data) => {
    await changeAction(data);
    setIsSentRequest(false);
    requestForm.reset();
    changeForm.reset();
  };

  const handleResend = async () => {
    if (disableResend) return;

    await submitRequest({
      currentEmail,
      newEmail: requestForm.getValues('newEmail'),
    });

    setCooldown(30);
  };

  return (
    <Bounded className={twMerge(clsx(className))}>
      {!isSentRequest && (
        <form
          noValidate
          onSubmit={requestForm.handleSubmit(submitRequest)}
          className="generic-form"
        >
          <SectionTitle as="h3">Change Email</SectionTitle>

          <p>
            Current Email:{' '}
            <span className="text-primary-700 dark:text-primary-400">
              {currentEmail}
            </span>
          </p>

          <FormTextField
            name="newEmail"
            label="New Email"
            type="email"
            control={requestForm.control}
            description="New email cannot be the same as old email"
          />

          <Field orientation="horizontal">
            <SubmitButton>Change</SubmitButton>
          </Field>
        </form>
      )}

      {isSentRequest && (
        <form
          className="generic-form"
          onSubmit={changeForm.handleSubmit(submitChange)}
          noValidate
        >
          <div className="space-y-1">
            <SectionTitle as="h3">Verity OTP</SectionTitle>
            <p>
              We&apos;ve sent a verification OTP to your new email{' '}
              <span className="font-semibold">
                {requestForm.getValues('newEmail')}
              </span>
            </p>
          </div>

          <Controller
            name="otp"
            control={changeForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="otp">OTP</FieldLabel>

                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  name={field.name}
                  onChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  value={field.value}
                  id="otp"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} aria-invalid={fieldState.invalid} />
                    <InputOTPSlot index={1} aria-invalid={fieldState.invalid} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot index={2} aria-invalid={fieldState.invalid} />
                    <InputOTPSlot index={3} aria-invalid={fieldState.invalid} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot index={4} aria-invalid={fieldState.invalid} />
                    <InputOTPSlot index={5} aria-invalid={fieldState.invalid} />
                  </InputOTPGroup>
                </InputOTP>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field orientation="horizontal">
            <SubmitButton>Verify</SubmitButton>

            <Button
              aria-label="resend otp request button"
              type="button"
              className={clsx('ml-auto', disableResend && 'bg-foreground/50')}
              variant="link"
              onClick={handleResend}
              disabled={disableResend}
            >
              Resend
            </Button>
          </Field>

          {disableResend && (
            <p className="text-fs-300 text-right">
              You can send again in {cooldown} seconds.
            </p>
          )}
        </form>
      )}
    </Bounded>
  );
};
