'use server';

import { cookies } from 'next/headers';
import { env } from './env/server';
import { AllContactsSchema, ContactType } from './AdminValidations';

export const getAllContacts = async (): Promise<ContactType[]> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${env.API_URL}/api/contacts`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      console.error('Get all contacts error', {
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),
      });

      return [];
    }

    const data = await response.json();

    return AllContactsSchema.parse(data);
  } catch (error) {
    console.error('Get All contacts error', error);

    return [];
  }
};
