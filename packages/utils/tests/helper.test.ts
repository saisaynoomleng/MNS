import { it, expect, describe } from 'vitest';
import {
  ALLOWED_IMAGE_TYPES,
  EamilRules,
  PasswordRules,
} from '../src/helper.js';

describe('Allowed image types', () => {
  it('should allow jpeg', () => {
    const imageType = 'image/jpeg';
    expect(ALLOWED_IMAGE_TYPES.includes(imageType)).toBe(true);
  });
});

describe('PasswordRules', () => {
  it('should validate the password', () => {
    const password = 'Secret123!';
    const password2 = 'secret';
    const password3 = 'secret123';
    const password4 = 'Secret123';

    expect(PasswordRules.every((r) => r.test(password))).toBe(true);
    expect(PasswordRules.every((r) => r.test(password2))).toBe(false);
    expect(PasswordRules.every((r) => r.test(password3))).toBe(false);
    expect(PasswordRules.every((r) => r.test(password4))).toBe(false);
  });
});

describe('emailRules', () => {
  it('should validate the eamil', () => {
    const email = 'test@mail.com';
    const email2 = 'testmail.com';

    expect(EamilRules(email)).toBe(true);
    expect(EamilRules(email2)).toBe(false);
  });
});
