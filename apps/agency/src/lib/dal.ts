'use server';

import { sanityFetch } from '@/sanity/lib/live';
import { env } from './env/server';
import { USER_FEATURE_REQUEST_APPS } from '@/sanity/lib/query';
import { cookies } from 'next/headers';
import { betterFetch } from '@better-fetch/fetch';

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

export const getAllUserFeatureRequestApps = async () => {
  const { data } = await sanityFetch({
    query: USER_FEATURE_REQUEST_APPS,
    perspective: 'published',
    stega: false,
  });

  return data;
};

type Session = {
  user: {
    id: string;
  };
  session: {
    id: string;
  };
};

export const getUserIdFromCookies = async () => {
  const cookieStore = await cookies();

  const { data: session, error } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: `${env.API_URL}`,
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  );

  if (error || !session) {
    throw new Error('Not authenticated');
  }

  return session.user.id;
};
