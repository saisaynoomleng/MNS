import { CONTACT_US_PAGE_CHAT_RESULT } from '@/sanity/types';
import {
  AnimateChatWidth,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Bounded,
  Bubble,
  BubbleContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  SectionTitle,
} from '@mns/ui';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type ChatBubbleProps = {
  chat: CONTACT_US_PAGE_CHAT_RESULT;
  className?: string;
};

export const ChatBubble = ({
  className,
  chat,
}: ChatBubbleProps): React.JSX.Element | null => {
  if (!chat?.messages) return null;

  return (
    <Bounded
      as="section"
      className={twMerge(
        clsx(
          'flex flex-col gap-y-4 justify-center items-center md:max-w-[70%] md:mx-auto',
          className,
        ),
      )}
    >
      <SectionTitle as="h3">Before You Hit Send</SectionTitle>

      {chat.messages.map((m) => (
        <React.Fragment key={m._key}>
          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarImage src={`https://placehold.co/50?text=You`} />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <MessageHeader>You</MessageHeader>
              <Bubble>
                <AnimateChatWidth>
                  <BubbleContent className="bg-primary! text-primary-foreground">
                    {m.inbound}
                  </BubbleContent>
                </AnimateChatWidth>
              </Bubble>
            </MessageContent>
          </Message>

          <Message align="end">
            <MessageAvatar>
              <Avatar>
                <AvatarImage src={`https://placehold.co/50?text=mns.`} />
                <AvatarFallback>mns.</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <MessageHeader>mns.</MessageHeader>
              <Bubble>
                <AnimateChatWidth>
                  <BubbleContent className="bg-secondary-800! text-primary-foreground">
                    {m.outbound}
                  </BubbleContent>
                </AnimateChatWidth>
              </Bubble>
            </MessageContent>
          </Message>
        </React.Fragment>
      ))}
    </Bounded>
  );
};
