import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Bounded } from './Bounded';

const meta: Meta<typeof Bounded> = {
  title: 'Components/Shared/Bouned',
  component: Bounded,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Wrapper component with predefined classes',
      },
    },
  },

  args: {
    as: 'section',
    isCenterd: false,
    padding: 'none',
    spacing: 'none',
    size: 'full',
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'React Element Type for a wrapper, default to SECTION',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },

    size: {
      control: 'radio',
      options: ['sm', 'md', 'full'],
      table: {
        type: {
          summary: 'Maximum size for the wrapper',
          detail: `
                    sm: 'max-w-4xl',
                    md: 'max-w-7xl',
                    full: 'max-w-none',
            `,
        },
      },
    },

    padding: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Horizontal padding for the wrapper, default to none',
          detail: `
                none: '',
                sm: 'px-4 md:px-8 lg:px-10',
                md: 'px-6 md:px-10 lg:px-12',
                lg: 'px-8 md:px-12 lg:px-16',
          `,
        },
      },
    },

    spacing: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'Vertical spacing between the children inside the wrapper',
          detail: `
                none: '',
                sm: 'space-y-4 md:space-y-6 lg:space-y-8',
                md: 'space-y-6 md:space-y-8 lg:space-y-10',
                lg: 'space-y-8 md:space-y-10 lg:space-y-12',
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
    <Bounded {...args}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eveniet
        reiciendis repellat fuga quam aliquid necessitatibus temporibus,
        perferendis nam sunt!
      </p>
    </Bounded>
  ),
  play: async ({ canvas }) => {
    const p = canvas.getByRole('paragraph');
    const wrapper = p.parentElement;

    await expect(p).toBeInTheDocument();
    await expect(wrapper?.tagName).toBe('SECTION');
  },
};

export const Main: Story = {
  render: (args) => (
    <Bounded {...args} as="main" size="md" isCenterd padding="sm">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eveniet
        reiciendis repellat fuga quam aliquid necessitatibus temporibus,
        perferendis nam sunt!
      </p>
    </Bounded>
  ),
  play: async ({ canvas }) => {
    const p = canvas.getByRole('paragraph');
    const wrapper = p.parentElement;

    await expect(p).toBeInTheDocument();
    await expect(wrapper?.tagName).toBe('MAIN');
  },
};
