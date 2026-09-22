import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignUpForm } from './SignUpForm';
import { expect, fn } from 'storybook/test';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/Forms/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Sign Up Form',
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
