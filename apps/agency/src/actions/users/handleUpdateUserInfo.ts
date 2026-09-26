'use server';

import { ActionResponse, UpdateUserDetailFormInput } from '@mns/utils';

export const handleUpdateUserInfo = async (
  data: UpdateUserDetailFormInput,
): Promise<ActionResponse<UpdateUserDetailFormInput>> => {
  try {
    return {
      success: true,
      message: '',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong, try again later',
    };
  }
};
