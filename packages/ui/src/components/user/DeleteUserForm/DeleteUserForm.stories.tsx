import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeleteUserForm } from './DeleteUserForm';
import { expect, fn, within } from 'storybook/test';

const meta: Meta<typeof DeleteUserForm> = {
  title: 'Components/Forms/DeleteUserForm',
  component: DeleteUserForm,
  parameters: {
    layout: 'centered',
  },

  args: {
    action: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent, args }) => {
    const deleteBtn = canvas.getByRole('button', {
      name: /delete this account/i,
    });

    await expect(deleteBtn).toBeInTheDocument();

    await userEvent.click(deleteBtn);

    const dialog = canvas.getByTestId('content');

    const continueBtn = within(dialog).findByRole('button', {
      name: /continue/i,
    });

    await expect(continueBtn).toBeInTheDocument();

    await expect(args.action).toHaveBeenCalled();
  },
};
