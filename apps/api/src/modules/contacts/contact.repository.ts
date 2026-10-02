import { eq } from 'drizzle-orm';
import db, {
  ContactMessagesTable,
  type InferInsertContactMessageTable,
} from '../../db/index.js';

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

        where: { id },
      });

      return data;
    },

    saveReplyMessage: async ({
      id,
      message,
    }: {
      id: string;
      message: string;
    }) => {
      const [data] = await db
        .insert(ContactMessagesTable)
        .values({
          message,
          contactId: id,
          direction: 'outbound',
          status: 'pending',
        })
        .returning({
          id: ContactMessagesTable.id,
          status: ContactMessagesTable.status,
        });

      return data;
    },

    updateContactMessageTableStatus: async ({
      id,
      status,
    }: {
      id: string;
      status: InferInsertContactMessageTable['status'];
    }) => {
      await db
        .update(ContactMessagesTable)
        .set({
          status,
        })
        .where(eq(ContactMessagesTable.id, id));
    },
  };
};
