import { SendEmailCommand } from '@aws-sdk/client-ses';
import { emailClient } from '../../lib/emailClient.js';
import { contactRepository } from './contact.repository.js';
import env from '../../lib/env.js';
import { renderContactReplyEmail } from '@mns/email';

export const contactService = () => {
  const repository = contactRepository();

  return {
    replyToContact: async ({
      id,
      message,
    }: {
      id: string;
      message: string;
    }) => {
      const contact = await repository.findById(id);

      if (!contact?.email && !contact?.name) return;

      const { email, name } = contact;

      const data = await repository.saveReplyMessage({ id, message });

      if (!data) return;

      await repository.updateContactTableStatus({ id });

      const html = await renderContactReplyEmail({ message, name });

      const sendEmailCommand = new SendEmailCommand({
        Source: env.CONTACT_ADDRESS,

        Destination: {
          ToAddresses: [email],
        },

        Message: {
          Subject: {
            Data: 'Catch up with your last reply',
            Charset: 'utf-8',
          },

          Body: {
            Html: {
              Data: html,
              Charset: 'utf-8',
            },
          },
        },
      });

      const emailResult = await emailClient.send(sendEmailCommand);

      if (!emailResult.MessageId) {
        return await repository.updateContactMessageTableStatus({
          id: data.id,
          status: 'failed',
        });
      }

      return await repository.updateContactMessageTableStatus({
        id: data.id,
        status: 'sent',
      });
    },
  };
};
