import { defineLive } from 'next-sanity/live';
import { client } from './client';

export const { SanityLive, sanityFetch } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});
