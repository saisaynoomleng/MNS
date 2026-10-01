'use client';

import { authClient } from '@/lib/auth-client';
import { createContext, useContext } from 'react';

type Session = ReturnType<typeof authClient.useSession>['data'];

type SessionContextValue = {
  session: NonNullable<Session>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export const AdminSessionContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = authClient.useSession();

  if (!session) return null;

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useAdminSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useAdminSession must be used within AdminSessionContext');
  }

  return context;
};
