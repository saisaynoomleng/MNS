import type { Meta, StoryObj } from '@storybook/react-vite';
import { UpdateUserDetailForm } from './UpdateUserDetailForm';
import { fn } from 'storybook/test';

const meta: Meta<typeof UpdateUserDetailForm> = {
  title: 'Components/Forms/UpdateUserDetailForm',
  component: UpdateUserDetailForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Update user detail form used in User Dashboard',
      },
    },
  },

  args: {
    userDetail: {
      name: 'sai',
    },
    updateAction: fn(),
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
