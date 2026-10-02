'use client';

import { BackTo } from '@/components/BackTo';
import { useGetContactsById } from '@/hooks/contacts';
import {
  Bounded,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SectionTitle,
  Separator,
  Spinner,
} from '@mns/ui';
import { formatDateUS, formatPriceInUSD, toTitleCase } from '@mns/utils';
import { useParams } from 'next/navigation';
import { FaCheck, FaRegBuilding } from 'react-icons/fa6';
import {
  RiBuilding2Line,
  RiCalendar2Line,
  RiMoneyDollarBoxLine,
} from 'react-icons/ri';
import { CONTACTS_STATUS_COLORS } from '../page';

const ContactDetail = () => {
  const params = useParams<{ id: string }>();

  const { id } = params;

  if (!id) return null;

  const { data: contact, isPending, isError } = useGetContactsById(id);

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
    updatedAt,
  } = contact;

  return (
    <Bounded as="main" padding="sm" spacing="sm" isCenterd={false} size="full">
      <BackTo href="/contacts" label="all contacts" />

      <div className="grid md:grid-cols-2 md:gap-x-8 gap-y-4">
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
                {maxBudget ? formatPriceInUSD(minBudget) : 0}
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
                {status ? toTitleCase(status) : 'New'}
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

        <Card>
          <CardHeader>
            <CardTitle>
              Reply to{' '}
              <span className="font-semibold text-primary">{email}</span>
            </CardTitle>
          </CardHeader>

          <CardContent>{/* Reply Form */}</CardContent>
        </Card>
      </div>

      <div className="">
        <SectionTitle as="h2">Chat History</SectionTitle>
        {/* Card  */}
      </div>
    </Bounded>
  );
};

export default ContactDetail;
