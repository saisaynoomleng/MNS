'use server';

import { env } from '@/lib/env/server';
import {
  ActionResponse,
  FeatureRequestFormInput,
  FeatureRequestFormSchema,
} from '@mns/utils';

export const handleRequestFeature = async (
  data: FeatureRequestFormInput,
): Promise<ActionResponse<FeatureRequestFormInput>> => {
  try {
    const result = FeatureRequestFormSchema.safeParse(data);

    if (!result.success) {
      const e = result.error.issues[0];

      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof FeatureRequestFormInput,
      };
    }

    const { userId } = result.data;

    const response = await fetch(
      `${env.API_URL}/api/users/${userId}/request-feature`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      },
    );

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
