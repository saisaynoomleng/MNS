'use server';

import { env } from '@/lib/env/server';
import { ContactReplyFormInput, ContactReplyFormSchema } from '@/lib/types';
import { ActionResponse } from '@mns/utils';
import { cookies } from 'next/headers';

export const handleContactReplyForm = async (
  data: ContactReplyFormInput,
): Promise<ActionResponse<ContactReplyFormInput>> => {
  try {
    const result = ContactReplyFormSchema.safeParse(data);
    const cookieStore = await cookies();

    if (!result.success) {
      const e = result.error.issues[0];

      return {
        success: false,
        message: e.message,
      };
    }

    const { id, message } = result.data;

    const response = await fetch(
      `${env.API_URL}/api/contacts/${id}/reply-to-contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ message }),
      },
    );

    if (!response.ok) {
      console.log('Handle contact reply form api error', {
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
    return {
      success: false,
      message: 'Something went wrong, try again later.',
    };
  }
};
