import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormTextField, type FormTextFieldProps } from './FormTextField';
import { useForm, type Resolver } from 'react-hook-form';
import type React from 'react';
import { useEffect } from 'react';
import { expect } from 'storybook/test';

type FormValues = { email: string };
type FormFieldProps = Omit<
  FormTextFieldProps<FormValues>,
  'name' | 'control'
> & {
  forcedError?: string;
};

const resolver: Resolver<FormValues> = async (values) =>
  values.email
    ? { values, errors: {} }
    : {
        values: {},
        errors: {
          email: { type: 'required', message: 'Email is required' },
        },
      };

const FormField = ({
  forcedError,
  ...props
}: FormFieldProps): React.JSX.Element => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (forcedError) {
      form.setError('email', {
        type: 'manual',
        message: forcedError,
      });
    }
  }, [forcedError, form.setError]);

  return <FormTextField name="email" control={form.control} {...props} />;
};

const meta: Meta<typeof FormField> = {
  title: 'Components/Shared/FormTextField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text field input for the forms',
      },
    },
  },

  args: {
    label: 'Email',
    autoComplete: 'email',
    type: 'email',
  },

  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ForcedError: Story = {
  args: {
    forcedError: 'Must be a valid email address',
  },
};

export const WithDescription: Story = {
  args: {
    description: `We'll never share your email`,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    autoComplete: 'current-password',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const ShowError: Story = {
  play: async ({ canvas, userEvent }) => {
    const email = canvas.getByLabelText(/email/i);

    await expect(email).toBeInTheDocument();

    await userEvent.type(email, 'a');
    await userEvent.clear(email);
    await userEvent.tab();

    await expect(await canvas.findByText('Email is required')).toBeVisible();
    await expect(email).toHaveAttribute('aria-invalid', 'true');
  },
};
