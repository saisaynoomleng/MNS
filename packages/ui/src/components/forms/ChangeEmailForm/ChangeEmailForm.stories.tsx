import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChangeEmailForm } from './ChangeEmailForm';
import { fn } from 'storybook/test';

const meta: Meta<typeof ChangeEmailForm> = {
  title: 'Components/Forms/ChangeEmailForm',
  component: ChangeEmailForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Change user email form for the user dashboard settings',
      },
    },
  },

  args: {
    currentEmail: 'sai@mail.com',
    changeAction: fn(),
    requestAction: fn(),
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
