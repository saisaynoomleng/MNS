'use client';

import { useGetAllContacts } from '@/hooks/contacts';
import { ContactType } from '@/lib/types';
import {
  Bounded,
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@mns/ui';
import { formatDateUS, replaceUnderscore, toTitleCase } from '@mns/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CiFilter } from 'react-icons/ci';
import { MdOutlineEmail } from 'react-icons/md';

const ContactsPage = () => {
  const { data: contacts, isPending, isError } = useGetAllContacts();
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const status = searchParams.get('status');

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>No contacts found</div>;
  }

  const totalContacts = contacts.length;

  const allStatuses = contacts.reduce(
    (acc, contact) => {
      acc[contact.status] += 1;

      return acc;
    },
    {
      new: 0,
      in_progress: 0,
      spam: 0,
      resolved: 0,
    },
  );

  const allContacts = status
    ? contacts.filter((c) => c.status === status)
    : contacts;

  const statusColor: Record<ContactType['status'], string> = {
    in_progress: '#e17115',
    new: '#0e79b2',
    spam: '#d3322f',
    resolved: '#3b6047',
  };

  return (
    <Bounded as="main" isCenterd={false} padding="sm" size="full" spacing="sm">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="col-span-full">
          <CardContent>
            <div className="flex gap-x-4 items-center">
              <MdOutlineEmail
                aria-hidden
                size={50}
                className="border border-muted p-2"
              />
              <div className="space-y-1">
                <p className="font-semibold">Total Contacts Customers</p>
                <p className="font-semibold text-fs-500">{totalContacts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {Object.entries(allStatuses).map(([status, count]) => (
          <Card key={status}>
            <CardContent>
              <div className="flex gap-x-4 items-center">
                <MdOutlineEmail
                  aria-hidden
                  size={50}
                  className="border border-muted p-2"
                  style={{
                    color: statusColor[status as keyof typeof statusColor],
                  }}
                />
                <div className="space-y-1">
                  <p className="font-semibold">
                    {toTitleCase(replaceUnderscore(status))}
                  </p>
                  <p className="font-semibold text-fs-500">{count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mr-auto">
        {/*To Do: search bar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-muted">
              <span>Filter</span>
              <span>
                <CiFilter aria-hidden />
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              {Object.keys(allStatuses).map((status) => (
                <DropdownMenuItem key={status} asChild>
                  <Link
                    href={{
                      pathname: '/contacts',
                      query: {
                        ...(page && { page }),
                        status,
                      },
                    }}
                  >
                    {toTitleCase(replaceUnderscore(status))}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Link href={`/contacts/${contact.id}`}>
                  {toTitleCase(contact.name)}
                </Link>
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell style={{ color: statusColor[contact.status] }}>
                {toTitleCase(contact.status)}
              </TableCell>
              <TableCell>{formatDateUS(contact.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* To Do: pagination */}
    </Bounded>
  );
};

export default ContactsPage;
