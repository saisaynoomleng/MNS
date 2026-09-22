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
