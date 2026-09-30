import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { ValidateBody } from '../../middlewares/validations.js';
import { NewsletterFormSchema } from '@mns/utils';
import type { InsertNewsletterTable } from '../../db/index.js';
import db, { NewslettersTable } from '../../db/index.js';
import { renderNewsletterEmail } from '@mns/email';
import { emailClient } from '../../lib/emailClient.js';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import env from '../../lib/env.js';

const router = Router();

router.post(
  '/',
  ValidateBody(NewsletterFormSchema),
  async (
    req: Request<{}, {}, InsertNewsletterTable>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;
      const html = await renderNewsletterEmail();

      await db
        .insert(NewslettersTable)
        .values({
          email,
        })
        .onConflictDoNothing({ target: NewslettersTable.email });

      emailClient.send(
        new SendEmailCommand({
          Source: env.NO_REPLY_ADDRESS,

          Destination: {
            ToAddresses: [email],
          },

          Message: {
            Subject: {
              Data: 'Thanks for subscribing to mns.',
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
        message: 'Thank you for your subscription!',
      });
    } catch (error) {
      console.error('Newsletter API error', error);

      return next(error);
    }
  },
);

export default router;
