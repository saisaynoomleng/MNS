'use client';

import { BackTo } from '@/components/BackTo';
import { useGetContactsById, useReplyContactForm } from '@/hooks/contacts';
import {
  Bounded,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FormTextareaField,
  LoadingSpinner,
  SectionTitle,
  Separator,
  Spinner,
  SubmitButton,
  toast,
} from '@mns/ui';
import {
  formatDateTimeUS,
  formatDateUS,
  formatPriceInUSD,
  replaceUnderscore,
  toTitleCase,
} from '@mns/utils';
import { useParams } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';
import {
  RiBuilding2Line,
  RiCalendar2Line,
  RiMoneyDollarBoxLine,
} from 'react-icons/ri';
import { CONTACTS_STATUS_COLORS } from '../page';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ContactReplyFormInput, ContactReplyFormSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';

type ContactMessageStatus = 'pending' | 'sent' | 'failed';

const CONTACT_MESSAGE_STATUS_COLORS: Record<ContactMessageStatus, string> = {
  pending: '#0e79b2',
  failed: '#d3322f',
  sent: '#3b6047',
};

const ContactDetail = () => {
  const params = useParams<{ id: string }>();
  const { mutateAsync: replyAction, isPending: replyPending } =
    useReplyContactForm();

  const { id } = params;

  const form = useForm<ContactReplyFormInput>({
    resolver: zodResolver(ContactReplyFormSchema),
    defaultValues: {
      message: '',
      id,
    },
  });

  const { data: contact, isPending, isError } = useGetContactsById(id);

  if (!id) return null;

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>No contacts found</div>;
  }

  const {
    name,
    email,
    message,
    companyName,
    minBudget,
    maxBudget,
    status,
    createdAt,
    messages,
  } = contact;

  const onReply: SubmitHandler<ContactReplyFormInput> = async (data) => {
    await replyAction(data);
    form.reset();
  };

  return (
    <Bounded as="main" padding="sm" spacing="sm" isCenterd={false} size="full">
      <BackTo href="/contacts" label="all contacts" />

      <div className="grid md:grid-cols-2 md:gap-x-8 gap-y-4 md:gap-y-8">
        <SectionTitle as="h2" className="col-span-full" size="sm">
          Details
        </SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>{toTitleCase(name)}</CardTitle>
            <CardDescription>{email}</CardDescription>
          </CardHeader>

          <Separator className="bg-muted" />

          <CardContent className="flex flex-col gap-y-2">
            <div className="flex justify-between">
              <p className="flex items-center gap-x-2">
                <span>
                  <RiBuilding2Line aria-hidden />
                </span>
                Company
              </p>
              <p className="font-semibold">
                {companyName ? toTitleCase(companyName) : '-'}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="flex items-center gap-x-2">
                <span>
                  <RiMoneyDollarBoxLine aria-hidden />
                </span>
                Minimum Budget
              </p>
              <p className="font-semibold">
                {minBudget ? formatPriceInUSD(minBudget) : 0}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="flex items-center gap-x-2">
                <span>
                  <RiMoneyDollarBoxLine aria-hidden />
                </span>
                Maximum Budget
              </p>
              <p className="font-semibold">
                {maxBudget ? formatPriceInUSD(maxBudget) : 0}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="flex items-center gap-x-2">
                <span>
                  <FaCheck aria-hidden />
                </span>
                Status
              </p>
              <p
                style={{ color: CONTACTS_STATUS_COLORS[status] }}
                className="font-semibold"
              >
                {status ? toTitleCase(replaceUnderscore(status)) : 'New'}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="flex items-center gap-x-2">
                <span>
                  <RiCalendar2Line aria-hidden />
                </span>
                Contacted Date
              </p>
              <p className="font-semibold">
                {createdAt ? formatDateUS(createdAt) : formatDateUS(new Date())}
              </p>
            </div>

            <div className="space-y-1">
              <p>Message</p>

              <p className="prose prose-sm min-w-full border rounded-lg border-muted p-2">
                {message}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col gap-y-4 justify-between">
          <CardHeader>
            <CardTitle>
              Reply to{' '}
              <span className="font-semibold text-primary">{email}</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={form.handleSubmit(onReply)}
              className="flex flex-col gap-y-4 min-h-full"
            >
              <FormTextareaField
                name="message"
                control={form.control}
                maxLength={5000}
                label="Message"
              />

              <Field orientation="horizontal" className="mt-auto">
                <SubmitButton
                  disabled={replyPending}
                  className={clsx(replyPending && 'bg-muted')}
                >
                  {replyPending ? <LoadingSpinner /> : 'Send'}
                </SubmitButton>
              </Field>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 md:space-y-8">
        <SectionTitle as="h2">Chat History</SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {messages.map((m) => (
            <Card key={m.id}>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <p className="flex items-center gap-x-2">
                    <span>
                      <FaCheck aria-hidden />
                    </span>
                    Status
                  </p>
                  <p
                    style={{
                      backgroundColor: CONTACT_MESSAGE_STATUS_COLORS[m.status],
                    }}
                    className="font-semibold text-background p-1 rounded-lg"
                  >
                    {m.status ? toTitleCase(m.status) : 'Pending'}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="flex items-center gap-x-2">
                    <span>
                      <RiCalendar2Line aria-hidden />
                    </span>
                    Replied Date
                  </p>
                  <p className="font-semibold">
                    {m.createdAt
                      ? formatDateTimeUS(m.createdAt)
                      : formatDateTimeUS(new Date())}
                  </p>
                </div>

                <div className="space-y-1">
                  <p>Message</p>

                  <p className="prose prose-sm min-w-full border rounded-lg border-muted p-2">
                    {m.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default ContactDetail;
