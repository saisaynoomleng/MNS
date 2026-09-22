import type { Meta, StoryObj } from '@storybook/react-vite';
import { OAuthSignInForm } from './OAuthSignInForm';
import { expect, fn } from 'storybook/test';

const meta: Meta<typeof OAuthSignInForm> = {
  title: 'Components/Forms/OAuthSignInForm',
  component: OAuthSignInForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Social Provider sign in buttons',
      },
    },
  },

  args: {
    action: fn(),
  },

  argTypes: {
    action: {
      control: false,
      description: 'Social Provider sign in strategy',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const facebook = canvas.getByTestId('facebook');
    const linkedin = canvas.getByTestId('linkedin');
    const google = canvas.getByTestId('google');

    await expect(facebook).toBeInTheDocument();
    await expect(linkedin).toBeInTheDocument();
    await expect(google).toBeInTheDocument();

    await userEvent.click(facebook);
    await expect(args.action).toHaveBeenCalledWith('facebook');

    await userEvent.click(google);
    await expect(args.action).toHaveBeenCalledWith('google');

    await userEvent.click(linkedin);
    await expect(args.action).toHaveBeenCalledWith('linkedIn');
  },
};
