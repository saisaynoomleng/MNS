import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResetPasswordForm } from './ResetPasswordForm';
import { fn } from 'storybook/test';

const meta: Meta<typeof ResetPasswordForm> = {
  title: 'Components/Forms/ResetPasswordForm',
  component: ResetPasswordForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Reset Password Form',
      },
    },
  },

  args: {
    requestPasswordAction: fn(),
    checkVerificationAction: fn(),
    resetPasswordAction: fn(),
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
