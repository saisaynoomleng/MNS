import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';
import { media } from 'sanity-plugin-media';

export default defineConfig({
  name: 'default',
  title: 'MNS',

  projectId: 'a8ioaakl',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
});
