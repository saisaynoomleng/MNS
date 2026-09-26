'use server';

import { env } from './env/server';

export const getUserById = async (id: string) => {
  try {
    const respone = await fetch(`${env.API_URL}/api/users/${id}`);

    if (!respone.ok) {
      console.error(`Get User by ID error`, {
        status: respone.status,
        statusText: respone.statusText,
      });

      return {};
    }

    const user = await respone.json();

    return user;
  } catch (error) {
    console.error('Get By User by ID Error', error);

    return {};
  }
};
