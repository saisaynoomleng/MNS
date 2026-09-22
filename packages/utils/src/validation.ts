import * as z from 'zod';

/* ----------------------------------*/
/* Helper Schema                     */
/* ----------------------------------*/

const emailSchema = z
  .email({ error: 'Must be a valid email address' })
  .min(1, { error: 'Email is required' });

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
  .refine((data) => data.maxBudget > data.minBudget);
/**
 * Contact Us Form Input type
 */
export type ContactUsFormInput = z.input<typeof ContactUsFormSchema>;
/**
 * Conatact Us Form Output type
 */
export type ContactUsFormOutput = z.output<typeof ContactUsFormSchema>;
