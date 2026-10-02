import db from '../../db/index.js';

export const contactRepository = () => {
  return {
    findAll: async () => {
      const data = await db.query.ContactsTable.findMany({
        columns: {
          id: true,
          name: true,
          email: true,
          status: true,
          createdAt: true,
        },
      });

      return data;
    },

    findById: async (id: string) => {
      const data = await db.query.ContactsTable.findFirst({
        with: {
          messages: true,
        },

        columns: {
          id: true,
          name: true,
          email: true,
          message: true,
          companyName: true,
          minBudget: true,
          maxBudget: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return data;
    },
  };
};
