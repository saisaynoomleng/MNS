import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionTitle } from './SectionTitle';
import { expect } from 'storybook/test';

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
  argTypes: {
    as: {
      control: false,
      description: 'Heading element, default to H2',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: {
          summary: 'sm',
        },
        type: {
          summary: 'Predefined sizes for the heading',
          detail: `
            sm: 'text-fs-500 md:text-fs-600 lg:text-fs-700',
            md: 'text-fs-600 md:text-fs-700 lg:text-fs-800',
            lg: 'text-fs-700 md:text-fs-800 lg:text-fs-900',
          `,
        },
      },
    },

    children: {
      control: false,
      description: 'React Node',
    },

    hasUnderline: {
      control: 'boolean',
      description: 'Whether the title has underline',
    },

    underlineColor: {
      control: 'radio',
      options: ['primary', 'secondary'],
      table: {
        defaultValue: {
          summary: 'primary',
        },
        type: {
          summary: 'Underline Color',
          detail: `
            primary: '#0e79b2'
            secondary: '#d96c5a'
          `,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SectionTitle hasUnderline {...args}>
      Explore our services
    </SectionTitle>
  ),
};

export const H3: Story = {
  render: (args) => (
    <SectionTitle hasUnderline {...args} as="h3" underlineColor="secondary">
      Explore our services
    </SectionTitle>
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading');

    await expect(heading?.tagName).toBe('H3');
  },
};
