import { eq } from 'drizzle-orm';
import db, {
  AddressesTable,
  FeatureRequestsTable,
  UsersTable,
  type InsertAddressTable,
} from '../../db/index.js';

export const userRepository = () => {
  return {
    findById: async (id: string) => {
      const user = await db.query.UsersTable.findFirst({
        with: {
          address: true,
        },
        columns: {
          id: true,
          name: true,
          email: true,
          phone: true,
          companyName: true,
          position: true,
        },
        where: { id },
      });

      return user;
    },

    updateUserInfo: async ({
      id,
      name,
      companyName,
      position,
      phone,
    }: {
      id: string;
      name: string;
      companyName: string;
      position: string;
      phone: string;
    }) => {
      const user = await db
        .update(UsersTable)
        .set({
          name,
          companyName,
          position,
          phone,
          updatedAt: new Date(),
        })
        .where(eq(UsersTable.id, id));

      return user;
    },

    findFeatureRequestHistory: async (id: string) => {
      const histories = await db.query.FeatureRequestsTable.findMany({
        with: {
          app: true,
        },
        columns: {
          body: true,
          createdAt: true,
          status: true,
        },
        where: { userId: id },
        orderBy: (table, { desc }) => desc(table.createdAt),
      });

      return histories;
    },

    findApp: async (sanityId: string) => {
      const app = await db.query.AppsTable.findFirst({
        columns: {
          id: true,
        },
        where: { sanityId },
      });

      return app;
    },

    requestFeature: async ({
      userId,
      appId,
      body,
    }: {
      userId: string;
      appId: string;
      body: string;
    }) => {
      await db.insert(FeatureRequestsTable).values({
        userId,
        appId,
        body,
        status: 'new',
      });
    },

    updateAddress: async ({
      userId,
      address1,
      address2,
      city,
      zip,
      state,
      country,
    }: InsertAddressTable) => {
      await db
        .insert(AddressesTable)
        .values({
          userId,
          address1,
          address2,
          city,
          zip,
          state,
          country,
        })
        .onConflictDoUpdate({
          target: AddressesTable.userId,
          set: {
            address1,
            address2,
            city,
            zip,
            state,
            country,
            updatedAt: new Date(),
          },
        });
    },
  };
};
