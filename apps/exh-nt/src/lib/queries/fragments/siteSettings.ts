import { groq } from 'next-sanity'

export const siteSettings = groq`
  "siteSettings": *[_id == "siteSettings"][0] {
    ...,
    publisher[]->{
      _id,
      label,
      image
    },
    footer->{
      ...,
      navMenu->{
        items[]{
          _key,
          label,
          description,
          backgroundColor,
          foregroundColor,
          "route": coalesce(landingPageRoute->.slug.current, route, link),
          children[]{
            _key,
            label,
            description,
            backgroundColor,
            foregroundColor,
            "route": coalesce(landingPageRoute->.slug.current, route, link),
          }
        }
      }
    }
  }
`
