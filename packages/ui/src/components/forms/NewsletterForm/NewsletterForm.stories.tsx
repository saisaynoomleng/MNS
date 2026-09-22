import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterForm } from './NewsletterForm';
import { mockFormAction } from '#lib/mock-data';
import { expect } from 'storybook/test';

const meta: Meta<typeof NewsletterForm> = {
  title: 'Components/Form/NewsletterForm',
  component: NewsletterForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Newsletter Form',
      },
    },
  },

  args: {
    action: mockFormAction,
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FillForm: Story = {
  play: async ({ canvas, userEvent }) => {
    const email = canvas.getByLabelText(/email/i);
    const submit = canvas.getByRole('button', {
      name: /subscribe/i,
    });

    await expect(email).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(email, 'john@mail.com');
    await userEvent.click(submit);

    await expect(mockFormAction).toHaveBeenCalledWith({
      email: 'john@mail.com',
    });
  },
};
