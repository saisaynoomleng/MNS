export const queryKeys = {
  users: {
    me: () => ['users', 'me'] as const,
    all: ['users'] as const,
    featureRequests: () => ['users', 'feature-requests'] as const,
  },

  apps: {
    all: ['apps'] as const,
    byId: (id: string) => ['apps', id] as const,
  },
};
