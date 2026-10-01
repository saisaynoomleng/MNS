import type { Meta, StoryObj } from '@storybook/react-vite';
import { ServiceHero } from './ServiceHero';

const meta: Meta<typeof ServiceHero> = {
  title: 'Components/Agency/ServiceHero',
  component: ServiceHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "Services Page's Animated Hero",
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
