import { fn } from 'storybook/test';

export const mockFormAction = fn(async () => {
  return {
    success: true,
    message: 'Form Submitted',
  };
});

export const FormArgsType = {
  action: {
    control: false,
    description: 'Server Action to be handled in Next.js',
  },

  className: {
    control: 'text',
    description: 'Additional TailwindCSS classes',
  },
};
