/**
 * Convert a string to Title Case
 * @param input string
 * @returns string
 * @example toTitleCase('foo bar') // 'Foo Bar'
 */
export const toTitleCase = (input: string): string => {
  return input
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Replace dash in a string with given replacement, default with whitespace ' '
 * @param input string
 * @param replacement string
 * @returns string
 * @example replaceDash('foo-bar') // 'foo bar'
 * @example replaceDash('foo-bar', '') // 'foobar'
 */
export const replaceDash = (input: string, replacement = ' '): string => {
  return input.replace(/-/g, replacement);
};

/**
 * Convert a string into URL-friendly slug
 * @param input string
 * @returns string
 * @example slugify('Foo Bar') // 'foo-bar'
 */
export const slugify = (input: string): string => {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 200);
};

/**
 * Replace whitespace in a string, default to underscore '_'
 * @param input string
 * @param replacement string
 * @returns string
 * @example replaceWhitespace('foo bar'); // 'foo_bar'
 */
export const replaceWhitespace = (input: string, replacement = '_'): string => {
  return input.replace(/\s+/g, replacement);
};

/**
 * Replace underscores in a string with replacement, default to whitepace ' '
 * @param input string
 * @param replacement string
 * @returns string
 * @example replaceUnderscore('foo_bar'); // 'foo bar'
 */
export const replaceUnderscore = (input: string, replacement = ' '): string => {
  return input.replace(/_+/g, replacement);
};

/**
 * Format a date into Readable US Date format
 * @param date string | Date
 * @returns string
 * @example formatDateUS('1996/09/24'); // 'Sep 24, 1996'
 */
export const formatDateUS = (date: string | Date): string => {
  const parseDate = new Date(date);

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parseDate);
};

/**
 * Return a year of the given date
 * @param date string | Date
 * @returns string
 * @example getFormattedYear('1996/09/24'); // '1996'
 */
export const getFormattedYear = (date: string | Date): string => {
  const parseDate = new Date(date);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
  }).format(parseDate);
};

/**
 * Check whether the input image size is larger than the specified size, default max size of 1MB
 * @param input number
 * @param maxSize number
 * @returns boolean
 * @example isImageTooLarge(1000, 1); //false
 */
export const isImageTooLarge = (input: number, maxSize = 1): boolean => {
  if (input >= maxSize * 1024 * 1024) return true;

  return false;
};

/**
 * Extract image file extension from MIME type
 * @param type string
 * @returns string
 */
export const getImageExtension = (type: string): string => {
  const [, ext] = type.split('/');

  return ext?.toUpperCase() ?? '';
};

/**
 * Format byte count into readable string with proper byte unit
 * @param size number
 * @returns string
 * @example formatImageSize(1023); // '1023 B'
 */
export const formatImageSize = (size: number): string => {
  if (size >= 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }

  if (size >= 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }

  return `${size} B`;
};

/**
 * Convert number price into USD currency
 * @param price number
 * @returns string
 * @example formatPriceInUSD(199.99); // '$199.99'
 */
export const formatPriceInUSD = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
  }).format(price);
};
