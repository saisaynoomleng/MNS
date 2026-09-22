import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordChecker } from './PasswordChecker';

const meta: Meta<typeof PasswordChecker> = {
  title: 'Components/Shared/PasswordChecker',
  component: PasswordChecker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Check password requirements for password input',
      },
    },
  },

  args: {
    password: '',
  },

  argTypes: {
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    password: {
      control: 'text',
      description: 'Password',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: { password: '$ecreT123' },
};
