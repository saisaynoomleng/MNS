import { defineQuery } from 'next-sanity';

export const NAVIGATION_QUERY = defineQuery(`*[_type == 'siteSettings'][0]{
  navLinks[]{
    _key,
    _type,
    href,
    label,
    isButton,
    isExternal,
    label,
    dropdownLinks[]{
      _key,
      label,
      links[]{
        _key,
        _type,
        href,
        label,
        isButton,
        isExternal
      }
    }
  }
}`);

export const FOOTER_QUERY = defineQuery(`*[_type == 'siteSettings'][0]{
  "columns": footerColumns[]{
    _key,
    title,
    links[]{
      _key,
      href,
      label
    }
  },
  "text": footerText,
  "street": contactInfo.street,
  "zip": contactInfo.zip,
  "city": contactInfo.city,
  "state": contactInfo.state,
  "email": contactInfo.email,
  "country": contactInfo.country,
  "socialLinks": socialLinks[]
}`);
