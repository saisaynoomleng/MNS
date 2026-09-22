import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactUsForm } from './ContactUsForm';
import { mockFormAction } from '#lib/mock-data';
import { expect } from 'storybook/test';

const meta: Meta<typeof ContactUsForm> = {
  title: 'Components/Forms/ContactUsForm',
  component: ContactUsForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Contact Us Form',
      },
    },
  },

  args: {
    action: mockFormAction,
  },
  argTypes: {
    action: {
      control: false,
      description: 'Server Action to be handled in Next.js',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    const name = canvas.getByLabelText(/name/i);
    const email = canvas.getByLabelText(/email/i);
    const message = canvas.getByLabelText(/message/i);
    const companyName = canvas.getByLabelText(/company/i);
    const minBudget = canvas.getByLabelText(/minimum budget/i);
    const maxBudget = canvas.getByLabelText(/maximum budget/i);
    const submit = canvas.getByRole('button', {
      name: /submit/i,
    });

    await expect(name).toBeInTheDocument();
    await expect(email).toBeInTheDocument();
    await expect(message).toBeInTheDocument();
    await expect(companyName).toBeInTheDocument();
    await expect(minBudget).toBeInTheDocument();
    await expect(maxBudget).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(name, 'john doe');
    await userEvent.type(email, 'john@mail.com');
    await userEvent.type(message, "I'm interested in building my project");
    await userEvent.type(companyName, 'Finding');
    await userEvent.type(minBudget, '500');
    await userEvent.type(maxBudget, '1000');
    await userEvent.click(submit);

    await expect(await canvas.findByTestId('spinner')).toBeVisible();

    await expect(mockFormAction).toHaveBeenCalledWith({
      name: 'john doe',
      email: 'john@mail.com',
      message: `I'm interested in building my project`,
      companyName: 'Finding',
      minBudget: 500,
      maxBudget: 1000,
    });
  },
};
