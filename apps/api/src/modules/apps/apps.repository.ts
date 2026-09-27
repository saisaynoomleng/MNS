import { eq } from 'drizzle-orm';
import db, { FeatureRequestsTable } from '../../db/index.js';

export const appRepository = () => {
  return {
    deleteFeatureRequest: async (id: string) => {
      await db
        .delete(FeatureRequestsTable)
        .where(eq(FeatureRequestsTable.appId, id));
    },
  };
};
