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

export const CONTACT_US_PAGE_CHAT = defineQuery(`*[_type == 'chatBubble'
 && defined(slug.current)
 && slug.current == $page][0]{
    messages[]{
      _key,
      inbound,
      outbound
    }
 }`);

export const PAGE_METADATA_QUERY = defineQuery(`*[_type == 'page'
 && defined(slug.current)
 && slug.current == $page][0]{
  "title": seo.metaTitle,
  "description": seo.metaDescription
 }`);

export const USER_FEATURE_REQUEST_APPS = defineQuery(`*[_type == 'app'
 && defined(slug.current)]{
  _id,
  name,
}`);

export const ALL_SERVICES_QUERY = defineQuery(`*[_type == 'service'
 && defined(slug.current)]
 | order(_createdAt){
  _id,
  name,
  subtitle,
  excerpt,
  "slug": slug.current,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt
 }`);

export const ALL_CAPABILITIES_QUERY = defineQuery(`*[_type == 'capability'
 && defined(slug.current)]{
  name,
  _id,
  value
 }`);

export const SERVICE_QUERY = defineQuery(`*[_type == 'service'
 && slug.current == $slug][0]{
  name,
  seo{
    "title": metaTitle,
    "description": metaDescription,
    "ogImage": ogImage.asset->url,
    "ogAlt": ogImage.alt
  },
  subtitle,
  body,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "subscriptions": *[_type == 'subscription'
                    && references(^._id)]
                    | order(_createdAt){
                      _id,
                      name,
                      "slug": slug.current,
                      pricePerMonth,
                      inclusives[],
                      exclusives[],
                    }
 }`);

export const PRICINGS_PER_TYPE_QUERY = defineQuery(`*[_type == 'subscription'
 && defined(slug.current)
 && type->slug.current == $type]
  | order(createdAt asc){
  _id,
  name,
  "type": type->name,
  "slug": slug.current,
  inclusives[],
  exclusives[],
  pricePerMonth
 }`);

export const PRICINGS_QUERY = defineQuery(`*[_type == 'subscription'
 && slug.current == $slug][0]{
  name,
  "type": type->name,
  pricePerMonth,
  excerpt,
  seo,
  inclusives[],
  exclusives[]
 }`);

export const ALL_PRICINGS_QUERY = defineQuery(`*[_type == 'subscription'
 && defined(slug.current)]{
  "slug": slug.current
 }`);
