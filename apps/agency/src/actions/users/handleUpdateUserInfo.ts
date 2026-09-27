'use server';

import { env } from '@/lib/env/server';
import {
  ActionResponse,
  UpdateUserDetailFormInput,
  UpdateUserDetailFormSchema,
} from '@mns/utils';
import { cookies } from 'next/headers';

export const handleUpdateUserInfo = async (
  data: UpdateUserDetailFormInput,
): Promise<ActionResponse<UpdateUserDetailFormInput>> => {
  try {
    const result = UpdateUserDetailFormSchema.safeParse(data);

    if (!result.success) {
      const e = result.error.issues[0];

      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof UpdateUserDetailFormInput,
      };
    }

    const response = await fetch(`${env.API_URL}/api/users/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: (await cookies()).toString(),
      },
      credentials: 'include',
      body: JSON.stringify(result.data),
    });

    if (!response.ok) {
      console.error(`Handle Update User Info error`, {
        status: response.status,
        statusText: response.statusText,
      });
      return {
        success: false,
        message: 'Something went wrong!',
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
      message: 'Something went wrong, try again later',
    };
  }
};
