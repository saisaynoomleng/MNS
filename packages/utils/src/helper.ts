import type { PasswordRuleProps } from './types.js';

export const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/webp',
  'image/jpg',
  'image/jpeg',
  'image/avif',
  'image/gif',
  'image/svg',
];

export const PasswordRules: PasswordRuleProps[] = [
  {
    id: 'minLength',
    label: 'Password must have at least 8 characters',
    test: (v) => v.length >= 8,
  },
  {
    id: 'maxLength',
    label: 'Password cannot exceeds 128 characters',
    test: (v) => v.length <= 128,
  },
  {
    id: 'upperCase',
    label: 'Password must include at least 1 Upper Case',
    test: (v) => /[A-Z]/.test(v),
  },
  {
    id: 'lowerCase',
    label: 'Password must include at least 1 Lower Case',
    test: (v) => /[a-z]/.test(v),
  },
  {
    id: 'number',
    label: 'Password must include at least 1 number',
    test: (v) => /[0-9]/.test(v),
  },
  {
    id: 'specialCase',
    label: 'Password must include at least 1 special case',
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

export const EamilRules = (email: string): boolean => {
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailReg.test(email)) return false;

  return true;
};
