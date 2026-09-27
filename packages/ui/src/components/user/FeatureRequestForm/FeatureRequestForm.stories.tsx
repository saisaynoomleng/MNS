import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeatureRequestForm } from './FeatureRequestForm';

const meta: Meta<typeof FeatureRequestForm> = {
  title: 'Components/Forms/FeatureRequestForm',
  component: FeatureRequestForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'User request particular feature for an app Form',
      },
    },
  },

  args: {},
  argTypes: {},

  decorators: [
    (Story) => (
      <div className="w-140">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
