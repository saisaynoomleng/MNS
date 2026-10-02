import { renderContactEmail } from '@mns/email';
import type { Request, Response, NextFunction } from 'express';
import { emailClient } from '../../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';
import db, { ContactsTable } from '../../db/index.js';
import { contactRepository } from './contact.repository.js';
import { contactService } from './contact.service.js';

export const ContactController = () => {
  const repository = contactRepository();
  const service = contactService();

  return {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await repository.findAll();

        return res.status(200).json(data);
      } catch (error) {
        console.error('Contacts API error', error);

        return next(error);
      }
    },

    getById: async (
      req: Request<{ id: string }>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.params;

        const data = await repository.findById(id);

        if (!data) {
          console.log(data);
          return res.status(500).json({
            message: 'Server Error!',
          });
        }

        return res.status(200).json(data);
      } catch (error) {
        console.error(`Get BY ID API error`, error);

        return next(error);
      }
    },

    replyToContact: async (
      req: Request<{ id: string }, {}, { message: string }>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.params;
        const { message } = req.body;

        await service.replyToContact({ id, message });

        return res.status(201).json({
          message: 'Succesfully replied to the contact!',
        });
      } catch (error) {
        console.error(`Reply Email API error`);

        return next(error);
      }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, email, message, minBudget, maxBudget, companyName } =
          req.body;

        const html = await renderContactEmail({ name });

        await db.insert(ContactsTable).values({
          name,
          email,
          message,
          minBudget,
          maxBudget,
          companyName,
          status: 'new',
        });

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
