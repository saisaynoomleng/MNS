import { createAuthClient } from 'better-auth/react';
import { adminClient, emailOTPClient } from 'better-auth/client/plugins';
import { env } from './env/client';

export const authClient = createAuthClient({
  baseURL: `${env.NEXT_PUBLIC_API_URL}/api/auth`,
  plugins: [emailOTPClient(), adminClient()],
  fetchOptions: {
    credentials: 'include',
  },
});
