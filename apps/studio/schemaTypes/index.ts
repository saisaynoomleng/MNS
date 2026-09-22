import {
  blockContent,
  faq,
  footerColumn,
  imageWithAlt,
  navDropdown,
  navLink,
  seo,
  socialLink,
  videoEmbedded,
} from './shareTypes';
import { siteSettings } from './singletons/site-settings';

export const schemaTypes = [
  // share Types
  imageWithAlt,
  blockContent,
  seo,
  socialLink,
  faq,
  navLink,
  navDropdown,
  footerColumn,
  videoEmbedded,

  //   singletons
  siteSettings,
];
