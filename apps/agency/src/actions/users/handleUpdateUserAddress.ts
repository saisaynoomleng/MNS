'use server';

import { env } from '@/lib/env/server';
import {
  ActionResponse,
  UpdateUserAddressFormInput,
  UpdateUserAddressFormSchema,
} from '@mns/utils';
import { cookies } from 'next/headers';

export const handleUpdateUserAddress = async (
  data: UpdateUserAddressFormInput,
): Promise<ActionResponse<UpdateUserAddressFormInput>> => {
  try {
    const result = UpdateUserAddressFormSchema.safeParse(data);
    const cookieStore = await cookies();

    if (!result.success) {
      const e = result.error.issues[0];

      return {
        success: false,
        message: e.message,
        field: e.path.join('.') as keyof UpdateUserAddressFormInput,
      };
    }

    const response = await fetch(`${env.API_URL}/api/users/update-address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(result.data),
    });

    if (!response.ok) {
      console.error('Address API Error', {
        body: await response.text(),
        status: response.status,
        statusText: response.statusText,
      });

      return {
        success: false,
        message: 'Something went wrong, try again later',
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      message: responseData.message,
    };
  } catch (error) {
    console.error(`Handle Update User Address Error`, error);

    return {
      success: false,
      message: 'Something went wrong, try again later.',
    };
  }
};
