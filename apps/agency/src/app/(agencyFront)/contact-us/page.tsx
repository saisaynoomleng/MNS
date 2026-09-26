import { handleContactUsForm } from '@/actions/handleContactUsForm';
import { ChatBubble } from '@/components/ChatBubble';
import { getMetadata } from '@/lib/getMetadata';
import { sanityFetch } from '@/sanity/lib/live';
import { CONTACT_US_PAGE_CHAT } from '@/sanity/lib/query';
import { Bounded, ContactUsForm } from '@mns/ui';
import type { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMetadata({ page: 'contact-us-page' });

  return {
    title: data?.title,
    description: data?.description,
  };
}

const ContactUsPage = async (): Promise<React.JSX.Element> => {
  const { data: chat } = await sanityFetch({
    query: CONTACT_US_PAGE_CHAT,
    perspective: 'published',
    stega: false,
    params: {
      page: 'contact-us-chat',
    },
  });

  return (
    <Bounded as="main" padding="sm" spacing="sm">
      <ContactUsForm
        action={handleContactUsForm}
        className="md:max-w-200 md:mx-auto"
      />

      <ChatBubble chat={chat} />
    </Bounded>
  );
};

export default ContactUsPage;
