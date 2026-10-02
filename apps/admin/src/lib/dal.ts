'use server';

import { cookies } from 'next/headers';
import { env } from './env/server';
import {
  AllContactsSchema,
  AllContactType,
  ContactSchema,
  ContactType,
} from './types';

export const getAllContacts = async (): Promise<AllContactType> => {
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

export const getContactById = async (id: string): Promise<ContactType> => {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${env.API_URL}/api/contacts/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!response.ok) {
      console.error('Get contact by id error', {
        status: response.status,
        statusText: response.statusText,
        body: await response.text(),
      });
    }

    const data = await response.json();

    return ContactSchema.parse(data);
  } catch (error) {
    console.error('Get Contact By id error', error);

    return {
      id: '',
      name: '',
      companyName: '',
      email: '',
      message: '',
      minBudget: 0,
      maxBudget: 0,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
};
