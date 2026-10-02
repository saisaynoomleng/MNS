export const queryKeys = {
  contacts: {
    all: ['contacts'] as const,
    byId: (id: string) => ['contacts', id] as const,
  },
};
