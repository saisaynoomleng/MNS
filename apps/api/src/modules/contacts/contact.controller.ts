import { renderContactEmail } from '@mns/email';
import type { Request, Response, NextFunction } from 'express';
import { emailClient } from '../../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';
import db, { ContactsTable } from '../../db/index.js';

export const ContactController = () => {
  return {
    getAll: async () => {},

    getById: async () => {},

    create: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, email, message, minBudget, maxBudget, companyName } =
          req.body;

        const html = await renderContactEmail({ name });

        await emailClient.send(
          new SendEmailCommand({
            Source: env.CONTACT_ADDRESS,

            Destination: {
              ToAddresses: [email],
            },

            Message: {
              Subject: {
                Data: `Thanks for reaching out — we'll be in touch soon.`,
                Charset: 'utf-8',
              },

              Body: {
                Html: {
                  Data: html,
                  Charset: 'utf-8',
                },
              },
            },
          }),
        );

        await db.insert(ContactsTable).values({
          name,
          email,
          message,
          minBudget,
          maxBudget,
          companyName,
          status: 'new',
        });

        return res.status(201).json({
          message: 'Your message have reached us!',
        });
      } catch (error) {
        console.error('create contacts api error', error);
        return next(error);
      }
    },
  };
};
