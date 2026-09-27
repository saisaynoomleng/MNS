import type { Meta, StoryObj } from '@storybook/react-vite';
import { UpdateUserPasswordForm } from './UpdateUserPasswordForm';

const meta: Meta<typeof UpdateUserPasswordForm> = {
  title: 'Components/Forms/UpdateUserPasswordForm',
  component: UpdateUserPasswordForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "Update user's password form in User Dashboard",
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
