'use client';

import clsx from 'clsx';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Bounded, SectionTitle } from '../../shared';
import { Button } from '#components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '#components/ui/alert-dialog';
import { useState } from 'react';

type DeleteUserFormProps = {
  className?: string;
  action: () => Promise<void>;
};

export const DeleteUserForm = ({
  className,
  action,
}: DeleteUserFormProps): React.JSX.Element => {
  const form = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<'confirm' | 'password'>('confirm');

  const onSubmit = async () => {
    await action();
    form.reset();
  };

  return (
    <Bounded
      className={twMerge(
        clsx(
          'flex flex-col gap-y-2 text-destructive border-2 border-destructive p-6 border-dashed',
          className,
        ),
      )}
    >
      <div className="flex flex-col gap-y-4">
        <SectionTitle as="h3">Danger Zone</SectionTitle>

        <p className="font-semibold">Delete this account</p>
        <p>
          Once you delete this account, there&apos;s no going back, everything
          related to this account will be deleted. Please be certain.
        </p>
      </div>

      <AlertDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);

          if (!open) {
            setStep('confirm');
          }
        }}
      >
        <AlertDialogTrigger asChild>
          <Button variant="destructive" type="button">
            Delete this account
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="border border-destructive text-destructive rounded-none secondary-box-shadow">
          {step === 'confirm' ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-semibold">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This deletion will perform
                  deletion on your subscriptions, account details, and payment
                  histories.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="bg-destructive/5">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => setStep('password')}
                  data-testid="continue button"
                >
                  Continue
                </Button>
              </AlertDialogFooter>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-semibold">
                  Confirm account deletion
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Continue to permanently delete your account.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <form noValidate onSubmit={onSubmit}>
                <Button type="submit" variant="destructive">
                  Delete
                </Button>
              </form>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </Bounded>
  );
};
