import { PasswordRules } from '@mns/utils';
import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import type React from 'react';
import { twMerge } from 'tailwind-merge';
import { FiX, FiCheck } from 'react-icons/fi';

type PasswordCheckerProps = {
  className?: string;
  password: string;
} & Omit<ComponentPropsWithoutRef<'ul'>, 'className'>;

export const PasswordChecker = ({
  className,
  password,
  ...props
}: PasswordCheckerProps): React.JSX.Element => {
  return (
    <div className={twMerge(clsx('', className))}>
      <ul
        className="flex flex-col gap-y-1"
        {...props}
        aria-label="Password Requirments List"
        aria-live="polite"
      >
        {PasswordRules.map((p) => {
          const passed = p.test(password);

          return (
            <li
              key={p.id}
              className={clsx(
                'flex items-center gap-x-2 transition-colors duration-200 ease-in-out text-fs-300',
                passed
                  ? 'text-success-700 dark:text-success-300'
                  : 'text-error-700 dark:text-error-500',
              )}
            >
              <span>{passed ? <FiCheck /> : <FiX />}</span>
              <span>{p.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
