import { appType } from './documents/appType';
import { capabilityType } from './documents/capabilityType';
import { caseStudyType } from './documents/caseStudyType';
import { chatBubbleType } from './documents/chatBubbleType';
import { faqsType } from './documents/faqsType';
import { pageType } from './documents/pageType';
import { serviceType } from './documents/serviceType';
import { subscriptionType } from './documents/subscriptionType';
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

  // documents
  serviceType,
  subscriptionType,
  caseStudyType,
  faqsType,
  capabilityType,
  appType,
  pageType,
  chatBubbleType,
];
