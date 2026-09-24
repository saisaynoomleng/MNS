import { createAuthClient } from 'better-auth/react';
import { adminClient, emailOTPClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: `/api/auth`,
  plugins: [emailOTPClient(), adminClient()],
});
