'use server';

import { env } from '@/lib/env/server';
import {
  ActionResponse,
  UpdateUserDetailFormInput,
  UpdateUserDetailFormSchema,
} from '@mns/utils';

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

    const { name, companyName, position, id } = result.data;

    const response = await fetch(`${env.API_URL}/api/users/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, companyName, position, id }),
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
