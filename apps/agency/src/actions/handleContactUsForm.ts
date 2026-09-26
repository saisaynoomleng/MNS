'use server';

import { env } from '@/lib/env/server';
import {
  ActionResponse,
  ContactUsFormInput,
  ContactUsFormOutput,
  ContactUsFormSchema,
} from '@mns/utils';

export const handleContactUsForm = async (
  data: ContactUsFormInput,
): Promise<ActionResponse<ContactUsFormOutput>> => {
  try {
    const result = ContactUsFormSchema.safeParse(data);

    if (!result.success) {
      const e = result.error.issues[0];

      return {
        success: false,
        message: e.message,
        field: e.path.join(',') as keyof ContactUsFormInput,
      };
    }

    const { name, email, message, minBudget, maxBudget, companyName } =
      result.data;

    const response = await fetch(`${env.API_URL}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        maxBudget,
        minBudget,
        companyName,
      }),
    });

    if (!response.ok) {
      console.error('Contact Us Form API error', {
        status: response.status,
        statusText: response.statusText,
      });

      return {
        success: false,
        message: 'Something went wrong, please try again.',
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      message: responseData.message,
    };
  } catch (error) {
    console.error(`Contact Us Form action error`, error);
    return {
      success: false,
      message: 'Something went wrong, please try again.',
    };
  }
};
