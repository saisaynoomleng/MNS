import { StructureResolver } from 'sanity/structure';

import { IoSettingsOutline } from 'react-icons/io5';
import {
  MdOutlineDesignServices,
  MdOutlineQuestionAnswer,
  MdPhonelink,
} from 'react-icons/md';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { RiSuitcaseLine } from 'react-icons/ri';
import { GiProgression } from 'react-icons/gi';
import { LuReceiptText } from 'react-icons/lu';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('MNS')
    .items([
      S.divider().title('Operations'),
      S.documentTypeListItem('siteSettings')
        .title('Site Settings')
        .icon(IoSettingsOutline),
      S.documentTypeListItem('service')
        .title('Services')
        .icon(MdOutlineDesignServices),
      S.documentTypeListItem('subscription')
        .title('Subscriptions')
        .icon(FaMoneyCheckDollar),
      S.documentTypeListItem('caseStudy')
        .title('Case Studies')
        .icon(RiSuitcaseLine),
      S.documentTypeListItem('app').title('Apps Hub').icon(MdPhonelink),
      S.documentTypeListItem('chatBubble')
        .title('Chat Bubbles')
        .icon(MdOutlineQuestionAnswer),

      S.divider().title('Marketing'),
      S.documentTypeListItem('faqs')
        .title('FAQs')
        .icon(MdOutlineQuestionAnswer),
      S.documentTypeListItem('capability')
        .title('Capabilities')
        .icon(GiProgression),

      S.divider().title('Pages'),
      S.documentTypeListItem('page').title('Pages').icon(LuReceiptText),
    ]);
