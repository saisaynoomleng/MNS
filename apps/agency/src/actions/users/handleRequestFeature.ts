'use server';

import { env } from '@/lib/env/server';
import {
  ActionResponse,
  FeatureRequestFormInput,
  FeatureRequestFormSchema,
} from '@mns/utils';
import { cookies } from 'next/headers';

export const handleRequestFeature = async (
  data: FeatureRequestFormInput,
): Promise<ActionResponse<FeatureRequestFormInput>> => {
  try {
    const result = FeatureRequestFormSchema.safeParse(data);
    const cookieStore = await cookies();

    if (!result.success) {
      const e = result.error.issues[0];

      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof FeatureRequestFormInput,
      };
    }

    const response = await fetch(`${env.API_URL}/api/users/request-feature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      credentials: 'include',
      body: JSON.stringify(result.data),
    });

    if (!response.ok) {
      console.log('Request Feature Response error', {
        status: response.status,
        statusText: response.statusText,
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
    console.error('Request Feature hanle error', error);
    return {
      success: false,
      message: 'Something went wrong, try again later.',
    };
  }
};
