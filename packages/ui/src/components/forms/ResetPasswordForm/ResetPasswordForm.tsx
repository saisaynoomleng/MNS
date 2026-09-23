'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckVerificationOTPFormSchema,
  RequestPasswordResetFormSchema,
  ResetPasswordFormSchema,
  type CheckVerificationOTPFormInput,
  type RequestPasswordResetFormInput,
  type ResetPasswordFormInput,
} from '@mns/utils';
import type React from 'react';
import { useEffect, useState } from 'react';
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from 'react-hook-form';
import {
  Bounded,
  FormTextField,
  PasswordChecker,
  SectionTitle,
  SubmitButton,
} from '../../shared';
import { Field, FieldError, FieldLabel } from '#components/ui/field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '#components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '#components/ui/button';
import clsx from 'clsx';

type ResetPasswordFormProps = {
  className?: string;
  requestPasswordAction: (data: RequestPasswordResetFormInput) => Promise<void>;
  checkVerificationAction: (
    data: CheckVerificationOTPFormInput,
  ) => Promise<void>;
  resetPasswordAction: (data: ResetPasswordFormInput) => Promise<void>;
};

export const ResetPasswordForm = ({
  className,
  requestPasswordAction,
  checkVerificationAction,
  resetPasswordAction,
}: ResetPasswordFormProps): React.JSX.Element => {
  const [isSentEmail, setIsSentEmail] = useState<boolean>(false);
  const [isSentOTP, setIsSentOTP] = useState<boolean>(false);

  const [secondsLeft, setSecondLeft] = useState<number>(0);
  const disableResend = secondsLeft > 0;

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const id = setTimeout(() => {
      setSecondLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [secondsLeft]);

  const requestForm = useForm<RequestPasswordResetFormInput>({
    resolver: zodResolver(RequestPasswordResetFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const verificationForm = useForm<CheckVerificationOTPFormInput>({
    resolver: zodResolver(CheckVerificationOTPFormSchema),
    defaultValues: {
      email: '',
      type: 'forget-password',
      otp: '',
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormInput>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  const inputPassword = useWatch({
    control: resetPasswordForm.control,
    name: 'password',
  });

  const submitRequest: SubmitHandler<RequestPasswordResetFormInput> = async (
    data,
  ) => {
    await requestPasswordAction(data);
    verificationForm.setValue('email', data.email);
    setIsSentEmail(true);
  };

  const submitOTP: SubmitHandler<CheckVerificationOTPFormInput> = async (
    data,
  ) => {
    await checkVerificationAction(data);
    resetPasswordForm.setValues({ email: data.email, otp: data.otp });
    setIsSentOTP(true);
  };

  const submitReset: SubmitHandler<ResetPasswordFormInput> = async (data) => {
    await resetPasswordAction(data);
    setIsSentEmail(false);
    setIsSentOTP(false);

    requestForm.reset();
    verificationForm.reset();
    resetPasswordForm.reset();
  };

  const handleResend = async () => {
    if (disableResend) return;

    const email = requestForm.getValues('email');
    await submitRequest({ email });
    setSecondLeft(30);
  };

  return (
    <Bounded padding="sm">
      {!isSentEmail && !isSentOTP && (
        <form
          noValidate
          onSubmit={requestForm.handleSubmit(submitRequest)}
          className="generic-form"
        >
          <div className="space-y-2">
            <SectionTitle as="h3">Reset your password</SectionTitle>
            <p>Enter the email linked to your account</p>
          </div>

          <FormTextField
            name="email"
            label="Email"
            type="email"
            control={requestForm.control}
            autoComplete="email"
          />

          <Field orientation="horizontal">
            <SubmitButton>Send</SubmitButton>
          </Field>
        </form>
      )}

      {isSentEmail && !isSentOTP && (
        <form
          onSubmit={verificationForm.handleSubmit(submitOTP)}
          className="generic-form"
        >
          <div className="space-y-1">
            <SectionTitle as="h3">Verity OTP</SectionTitle>
            <p>We&apos;ve sent an OTP to your email.</p>
          </div>

          <Controller
            name="otp"
            control={verificationForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="otp">OTP</FieldLabel>

                <InputOTP
                  id="otp"
                  name={field.name}
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  pattern={REGEXP_ONLY_DIGITS}
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
              variant="link"
              className={clsx('ml-auto', disableResend && 'bg-foreground/50')}
              onClick={handleResend}
              disabled={disableResend}
            >
              Resend
            </Button>
          </Field>

          {disableResend && (
            <p className="text-right text-fs-300">
              You can send again in {secondsLeft} seconds
            </p>
          )}
        </form>
      )}

      {isSentEmail && isSentOTP && (
        <form
          onSubmit={resetPasswordForm.handleSubmit(submitReset)}
          className="generic-form"
        >
          <SectionTitle as="h3">Set New Password</SectionTitle>

          <FormTextField
            name="password"
            label="New Password"
            type="password"
            control={resetPasswordForm.control}
            autoComplete="new-password"
          />

          <FormTextField
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            autoComplete="current-password"
            control={resetPasswordForm.control}
          />

          <PasswordChecker password={inputPassword} />

          <Field orientation="horizontal">
            <SubmitButton>Set New Password</SubmitButton>
          </Field>
        </form>
      )}
    </Bounded>
  );
};
