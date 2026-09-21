import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm, type Resolver } from 'react-hook-form';
import {
  FormTextareaField,
  type FormTextareaFieldProps,
} from './FormTextareaField';
import type React from 'react';
import { useEffect } from 'react';
import { expect } from 'storybook/test';

type FormValues = { message: string };
type FormFieldProps = Omit<
  FormTextareaFieldProps<FormValues>,
  'name' | 'control'
> & {
  forcedError?: string;
};

const resolver: Resolver<FormValues> = async (values) =>
  values.message
    ? { values, errors: {} }
    : {
        values: {},
        errors: {
          message: {
            type: 'required',
            message: 'Message is required',
          },
        },
      };

const FormField = ({
  forcedError,
  ...props
}: FormFieldProps): React.JSX.Element => {
  const form = useForm<FormValues>({
    resolver,
    defaultValues: {
      message: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (forcedError) {
      form.setError('message', {
        message: 'Message is required',
      });
    }
  }, [form.setError, forcedError]);

  return <FormTextareaField name="message" control={form.control} {...props} />;
};

const meta: Meta<typeof FormField> = {
  title: 'Components/Shared/FormTextareaField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Textarea field for forms',
      },
    },
  },

  args: {
    label: 'Message',
    minLength: 10,
    maxLength: 3000,
  },

  decorators: [
    (Story) => (
      <div className="min-w-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'Message helps us understand your business needs',
  },
};

export const ForceError: Story = {
  args: {
    forcedError: 'Message must have at least 10 characters',
  },
};

export const Filled: Story = {
  play: async ({ canvas, userEvent }) => {
    const textarea = canvas.getByLabelText(/message/i);

    await expect(textarea).toBeInTheDocument();

    await userEvent.type(textarea, 'testing the textarea form');
    await userEvent.clear(textarea);
    await userEvent.tab();

    await expect(await canvas.findByText('Message is required')).toBeVisible();
    await expect(textarea).toHaveAttribute('aria-invalid', 'true');
  },
};
