import db from '../../db/index.js';

export const contactRepository = () => {
  return {
    findAll: async () => {
      const data = await db.query.ContactsTable.findMany({
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
