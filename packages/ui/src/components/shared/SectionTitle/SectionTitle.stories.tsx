import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionTitle } from './SectionTitle';

const meta: Meta<typeof SectionTitle> = {
  title: 'Components/Shared/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Title with predefined classes for each section on the website',
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SectionTitle hasUnderline>Explore our services</SectionTitle>
  ),
};
