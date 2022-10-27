import { groq } from 'next-sanity'

export const mainNav = groq`"mainNav": *[_id == "main-nav"][0]{
  tree[] {
    _key,
    parent,
    value {
      reference->{
        "label": coalesce(
          label,
          *[__i18n_base._ref == ^.page._ref && __i18n_lang == $language][0].label,
          page->.label,
        ),
        description,
        "route": coalesce(slug.current,link,route),
        backgroundColor {
          hex,
        },
        foregroundColor {
          hex
        },
      }
    }
  }
}`