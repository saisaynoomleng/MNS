export const queryKeys = {
  users: {
    byId: (id: string) => ['users', id] as const,
    all: ['users'] as const,
    featureRequests: (id: string) => ['users', 'feature-requests', id] as const,
  },

  apps: {
    all: ['apps'] as const,
    byId: (id: string) => ['apps', id] as const,
  },
};
