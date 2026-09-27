'use client';

import { authClient } from '@/lib/authClient';
import { createContext, useContext } from 'react';

type Session = ReturnType<typeof authClient.useSession>['data'];

type SessionContextValue = {
  session: NonNullable<Session>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export const UserSessionContext = ({
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

export const useUserSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useUserSession must be used within UserSessionContext');
  }

  return context;
};
