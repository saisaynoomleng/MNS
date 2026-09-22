import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignInForm } from './SignInForm';
import { expect, fn } from 'storybook/test';

const meta: Meta<typeof SignInForm> = {
  title: 'Components/Forms/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Sign In Form',
      },
    },
  },

  args: {
    action: fn(),
    OAuthAction: fn(),
  },
  argTypes: {
    action: {
      control: false,
      description: 'Email Sign In Action to be handled in Next.js',
    },

    OAuthAction: {
      control: false,
      description: 'Social Providers sign in action to be handled in Next.js',
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
  play: async ({ canvas, userEvent, args }) => {
    const email = canvas.getByLabelText(/email/i);
    const password = canvas.getByLabelText(/password/i);
    const remember = canvas.getByLabelText(/remember me/i);
    const submit = canvas.getByRole('button', {
      name: /sign in/i,
    });

    await expect(email).toBeInTheDocument();
    await expect(password).toBeInTheDocument();
    await expect(remember).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(email, 'jon@mail.com');
    await userEvent.type(password, 'secret');
    await userEvent.click(remember);

    await userEvent.click(submit);

    await expect(args.action).toHaveBeenCalledWith({
      email: 'jon@mail.com',
      password: 'secret',
      rememberMe: true,
    });
  },
};
