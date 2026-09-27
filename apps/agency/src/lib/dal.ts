'use server';

import { sanityFetch } from '@/sanity/lib/live';
import { env } from './env/server';
import { USER_FEATURE_REQUEST_APPS } from '@/sanity/lib/query';
import { cookies } from 'next/headers';
import { betterFetch } from '@better-fetch/fetch';
import { GetMeProps, UserFeatureHistoryType } from './types';

export const getMe = async (): Promise<GetMeProps | null> => {
  try {
    const cookieStore = await cookies();

    const respone = await fetch(`${env.API_URL}/api/users/me`, {
      credentials: 'include',
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!respone.ok) {
      console.error(`Get User by ID error`, {
        status: respone.status,
        statusText: respone.statusText,
        body: await respone.text(),
      });

      return null;
    }

    return await respone.json();
  } catch (error) {
    console.error('Get By User by ID Error', error);

    return null;
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

export const getUserFeatureRequestHistory =
  async (): Promise<UserFeatureHistoryType> => {
    try {
      const cookieStore = await cookies();

      const response = await fetch(
        `${env.API_URL}/api/users/request-feature-history`,
        {
          credentials: 'include',
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      if (!response.ok) {
        console.error(`Get user feature request history dal response error`, {
          status: response.status,
          statusText: response.statusText,
        });
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(`Get user feature request history dal error`, error);

      return [];
    }
  };
