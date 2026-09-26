export const queryKeys = {
  users: {
    byId: (id: string) => ['users', id] as const,
    all: ['users'] as const,
  },
};
