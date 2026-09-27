import type { Meta, StoryObj } from '@storybook/react-vite';
import { UpdateUserAddressForm } from './UpdateUserAddressForm';
import { expect, fn } from 'storybook/test';

const meta: Meta<typeof UpdateUserAddressForm> = {
  title: 'Components/Forms/UpdateUserAddressForm',
  component: UpdateUserAddressForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Update User address in the user dashboard',
      },
    },
  },

  args: {
    action: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const update = canvas.getByTestId('submit');
    const a1 = canvas.getByLabelText('Street Address 1');
    const a2 = canvas.getByLabelText('Street Address 2');
    const city = canvas.getByLabelText('City');
    const state = canvas.getByLabelText('State');
    const address = canvas.getByLabelText('Country');

    await expect(update).toBeInTheDocument();
    await expect(a1).toBeInTheDocument();
  },
};
