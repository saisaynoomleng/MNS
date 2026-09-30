'use server';

import { env } from '@/lib/env/server';
import {
  ActionResponse,
  NewsletterFormInput,
  NewsletterFormSchema,
} from '@mns/utils';

export const handleNewsletterForm = async (
  data: NewsletterFormInput,
): Promise<ActionResponse<NewsletterFormInput>> => {
  try {
    const result = NewsletterFormSchema.safeParse(data);

    if (!result.success) {
      const error = result.error.issues[0];

      return {
        success: false,
        message: error.message,
        field: error.path.join('.') as keyof NewsletterFormInput,
      };
    }

    const response = await fetch(`${env.API_URL}/api/newsletter-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    });

    if (!response.ok) {
      console.error('Newsletter API request error', {
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),
      });

      return {
        success: false,
        message: 'Something went wrong, try again later.',
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      message: responseData.message,
    };
  } catch (error) {
    console.log('Handle newsletter error', error);

    return {
      success: false,
      message: 'Something went wrong, try again later!',
    };
  }
};
