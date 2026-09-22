import * as z from 'zod';

/**
 * Newsletter Form Schema
 */
export const NewsletterFormSchema = z.object({
  email: z
    .email({ error: 'Must be a valid email address' })
    .min(1, { error: 'Email is required' }),
});
/**
 * Newsletter Form Input Type
 */
export type NewsletterFormInput = z.input<typeof NewsletterFormSchema>;
/**
 * Newsletter Form Output Type
 */
export type NewsletterFormOutput = z.output<typeof NewsletterFormSchema>;
