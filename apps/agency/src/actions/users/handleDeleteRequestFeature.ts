'use server';

import { env } from '@/lib/env/server';
import { cookies } from 'next/headers';

export const handleDeleteRequestFeature = async (id: string) => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${env.API_URL}/api/apps/delete-feature-request/${id}`,
      {
        method: 'DELETE',
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    if (!response.ok) {
      console.log('Handle delete request feature error', {
        body: await response.text(),
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
    console.error('Handle delete request error', error);

    return {
      successs: false,
      message: 'Something went wrong, try again later.',
    };
  }
};
