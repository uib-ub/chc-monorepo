import { groq } from 'next-sanity'
import { siteSettings } from './fragments'
import { mainNav } from './fragments'

const ROUTE_CONTENT = groq`
  ...,
  "excerpt": pt::text(excerpt),
  "headings": body[length(style) == 2 && string::startsWith(style, "h")],
  creator[] {
    ...,
    assignedActor-> {
      _id,
      label
    },
    assignedRole-> {
      _id,
      label
    }
  },
  about-> {
    _id,
    label,
    preferredIdentifier,
    hasCurrentOwner[]->{
      _id,
      label,
    },
    image {
      asset->{
        ...,
        metadata
      }
    },
  },
  image {
    asset->{
      ...,
      metadata
    }
  },
  body[] {
    ...,
    _type == 'reference' => @->{
      _id,
      _type,
      label,
      shortDescription,
      image,
      memberOf[]->{
        _id,
        label,
        image {
					asset->{
						...,
						metadata
					}
				}
      }
    },
    _type == 'EventSection' && disabled != true => {
      ...,
      item-> {
        _id,
        label,
        timespan,
        location,
        referredToBy[] {
          ...
        },
        image {
					asset->{
						...,
						metadata
					}
				},
      }
    },
    _type == 'ObjectBlock' => @{
      ...,
      items[] {
        ...,
        "objectDescription": internalRef-> {
          _id,
          label,
          preferredIdentifier,
          hasCurrentOwner[]->{
            _id,
            label,
          },
        },
        "image": coalesce(
          image {
            asset->{
              ...,
              metadata
            }
          },
          internalRef->.image {
            asset->{
              ...,
              metadata
            }
          },
        ),
        "manifest": coalesce(
          internalRef->.subjectOfManifest, 
          manifestUrl,
          "/api/manifest/" + internalRef->._id
        ),
      }
    },
    _type == 'HeroBlock' => @{
      ...,
      item {
        ...,
        "objectDescription": internalRef-> {
          _id,
          label,
          preferredIdentifier,
          hasCurrentOwner[]->{
            _id,
            label,
          },
        },
        "image": coalesce(
          image {
            asset->{
              ...,
              metadata
            }
          },
          internalRef->.image {
            asset->{
              ...,
              metadata
            }
          },
        ),
        "manifest": coalesce(
          internalRef->.subjectOfManifest, 
          manifestUrl,
          "/api/manifest/" + internalRef->._id
        ),
      }
    },
  },
  content[] {
    ...,
    _type == 'EventSection' && disabled != true => {
      ...,
      item-> {
        _id,
        label,
        timespan,
        location,
        referredToBy[] {
          ...
        },
        image,
      }
    },
    _type == 'ObjectBlock' => @{
      ...,
      item[] {
        ...,
        "objectDescription": internalRef-> {
          _id,
          label,
          preferredIdentifier,
          hasCurrentOwner[]->{
            _id,
            label,
          },
        },
        "image": coalesce(
          image {
            asset->{
              ...,
              metadata
            }
          },
          internalRef->.image {
            asset->{
              ...,
              metadata
            }
          },
        ),
        "manifest": coalesce(
          internalRef->.subjectOfManifest, 
          manifestUrl,
          "/api/manifest/" + internalRef->._id
        ),
      }
    },
  }`

export const routeQuery = groq`
{
  ${mainNav},
  "route": *[slug.current == $slug]{
    ...,
    "slug": slug.current,
    "languages": [page->.__i18n_lang, ...page->.__i18n_refs[]->.__i18n_lang],
    // 'locale': coalesce(
    //  *[__i18n_base._ref match ^.page._ref && __i18n_lang == $language][0...2]{...},
    //  *[_id match ^.page._ref && __i18n_lang == $language][0...2]{...},
    // ),
    "locale": *[__i18n_base._ref match ^.page._ref && __i18n_lang == $language]{${ROUTE_CONTENT}},
    "fallback": *[_id match ^.page._ref && __i18n_lang == $language]{${ROUTE_CONTENT}}                                                                      
  },
  ${siteSettings}
}
`
