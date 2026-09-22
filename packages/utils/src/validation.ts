import * as z from 'zod';
import { PasswordRules } from './helper.js';

/* ----------------------------------*/
/* Helper Schema                     */
/* ----------------------------------*/

const emailSchema = z
  .email({ error: 'Must be a valid email address' })
  .min(1, { error: 'Email is required' });

const passwordSchema = z
  .string()
  .min(8, { error: 'Password must have at least 8 characters' })
  .max(128, { error: 'Password cannot exceed 128 characters' })
  .refine((data) => PasswordRules.every((v) => v.test(data)), {
    error: 'Password requiremnts does not meet',
    path: ['password'],
  });

/* ----------------------------------*/
/* Form Schema                       */
/* ----------------------------------*/

/**
 * Newsletter Form Schema
 */
export const NewsletterFormSchema = z.object({
  email: emailSchema,
});
/**
 * Newsletter Form Input Type
 */
export type NewsletterFormInput = z.input<typeof NewsletterFormSchema>;
/**
 * Newsletter Form Output Type
 */
export type NewsletterFormOutput = z.output<typeof NewsletterFormSchema>;

/**
 * Contact Us Form Schema
 */
export const ContactUsFormSchema = z
  .object({
    name: z.string().min(1, { error: 'Name is required' }),
    companyName: z.string().optional(),
    email: emailSchema,
    minBudget: z.coerce.number().positive(),
    maxBudget: z.coerce.number().positive(),
    message: z
      .string()
      .min(10, { error: 'Message must have at least 10 characters' })
      .max(3000, { error: 'Message cannot exceeds 3000 characters' }),
  })
  .refine((data) => data.maxBudget > data.minBudget, {
    error: 'Maximum Budget is lower than Minimum Budget',
    path: ['maxBudget'],
  });
/**
 * Contact Us Form Input type
 */
export type ContactUsFormInput = z.input<typeof ContactUsFormSchema>;
/**
 * Conatact Us Form Output type
 */
export type ContactUsFormOutput = z.output<typeof ContactUsFormSchema>;

/**
 * Sign In Form Schema
 */
export const SignInFormSchema = z.object({
  email: emailSchema,
  password: z.string(),
  rememberMe: z.boolean().default(false),
});
/**
 * Sign In Form Input type
 */
export type SignInFormInput = z.input<typeof SignInFormSchema>;
/**
 * Sign In Form Output type
 */
export type SignInFormOutput = z.output<typeof SignInFormSchema>;

/**
 * Sign Up Form Schema
 */
export const SignUpFormSchema = z
  .object({
    name: z.string().min(1, { error: 'Name is required' }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { error: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Password must match',
    path: ['confirmPassword'],
  });
/**
 * Sign Up Form Input type
 */
export type SignUpFormInput = z.input<typeof SignUpFormSchema>;
/**
 * Sign Up Form Output type
 */
export type SignUpFormOutput = z.output<typeof SignUpFormSchema>;

/**
 * Request Password Reset Form Schema
 */
export const RequestPasswordResetFormSchema = z.object({
  email: emailSchema,
});
/**
 * Request Password Reset Form Input
 */
export type RequestPasswordResetFormInput = z.input<
  typeof RequestPasswordResetFormSchema
>;

/**
 * Check Verification OTP Form Schema
 */
export const CheckVerificationOTPFormSchema =
  RequestPasswordResetFormSchema.extend({
    type: z.literal('forget-password'),
    otp: z
      .string()
      .min(1, { error: 'OTP must have at least 1 character' })
      .max(6, { error: 'OTP cannot exceed 6 characters' }),
  });
/**
 * Check Verification OTP Form Input Type
 */
export type CheckVerificationOTPFormInput = z.input<
  typeof CheckVerificationOTPFormSchema
>;

/**
 * Reset Password Form Schema
 */
export const ResetPasswordFormSchema = CheckVerificationOTPFormSchema.omit({
  type: true,
})
  .extend({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Password must match',
    path: ['confirmPassword'],
  });
/**
 * Reset Password Form Input
 */
export type ResetPasswordFormInput = z.input<typeof ResetPasswordFormSchema>;
