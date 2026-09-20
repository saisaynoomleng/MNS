import { describe, expect, it } from 'vitest';
import {
  formatDateUS,
  formatImageSize,
  formatPriceInUSD,
  getFormattedYear,
  getImageExtension,
  isImageTooLarge,
  replaceDash,
  replaceUnderscore,
  replaceWhitespace,
  slugify,
  toTitleCase,
} from '../src/formatter.js';

describe('toTitleCase', () => {
  it('should convert texts into title cases', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
    expect(toTitleCase('       hello                 world')).toBe(
      'Hello World',
    );
  });
});

describe('replaceDash', () => {
  it('should replace dash with whitespace', () => {
    expect(replaceDash('hello-world')).toBe('hello world');
  });
  it('should replace dash with dollar sign', () => {
    expect(replaceDash('hello-world', '$')).toBe('hello$world');
  });
});

describe('slugify', () => {
  it('should slugify a text', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('should ignore special cases', () => {
    expect(slugify('Hello           World$+-=        ')).toBe('hello-world-');
  });
});

describe('replaceWhiteSpace', () => {
  it('should replace whitepace with underscore', () => {
    expect(replaceWhitespace('hello world')).toBe('hello_world');
  });
  it('should replace whitespace with $', () => {
    expect(replaceWhitespace("hello world, i'm developer, i design", '$')).toBe(
      "hello$world,$i'm$developer,$i$design",
    );
  });
});

describe('replaceUnderscore', () => {
  it('should replace underscore with whitespace', () => {
    expect(replaceUnderscore('hello_world')).toBe('hello world');
  });
  it('should replace underscore with dollar sign', () => {
    expect(replaceUnderscore('hello_world', '$')).toBe('hello$world');
  });
});

describe('formatDateUS', () => {
  it('should convert date to US format', () => {
    expect(formatDateUS('1996/09/24')).toBe('Sep 24, 1996');
  });
});

describe('getFormattedYear', () => {
  it('should get a year', () => {
    expect(getFormattedYear('1996/09/24')).toBe('1996');
  });
});

describe('isImageTooLarge', () => {
  it('should validate the image size', () => {
    expect(isImageTooLarge(1000, 1)).toBe(false);
    expect(isImageTooLarge(1024 * 1024, 1)).toBe(true);
  });
});

describe('getImageExtension', () => {
  it('should get image extension', () => {
    expect(getImageExtension('image/jpg')).toBe('JPG');
  });
});

describe('formatImageSize', () => {
  it('should get image size in B', () => {
    expect(formatImageSize(1000)).toBe('1000 B');
  });
  it('should get image size in KB', () => {
    expect(formatImageSize(1030)).toBe('1.01 KB');
  });
  it('should get image size in MB', () => {
    expect(formatImageSize(10003000)).toBe('9.54 MB');
  });
  it('should get image size in GB', () => {
    expect(formatImageSize(10003000000)).toBe('9.32 GB');
  });
});

describe('formatPriceInUSD', () => {
  it('should format a number in USD', () => {
    expect(formatPriceInUSD(199.99)).toBe('$199.99');
  });
});
