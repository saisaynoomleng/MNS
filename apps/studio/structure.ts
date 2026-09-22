import { StructureResolver } from 'sanity/structure';

import { IoSettingsOutline } from 'react-icons/io5';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('MNS')
    .items([
      S.divider().title('Operations'),
      S.documentTypeListItem('siteSettings')
        .title('Site Settings')
        .icon(IoSettingsOutline),
    ]);
