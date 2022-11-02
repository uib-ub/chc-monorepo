import { groq } from 'next-sanity'
import { depicts } from './props'

export const item = groq`
  ...,
  ${depicts},
  hasType[]-> {
    _id,
    label
  },
  image{
    ...,
    "palette": asset->.metadata.palette,
  },
  subjectOfManifest,
  "manifest": coalesce(
    subjectOfManifest, 
    "/api/manifest/" + _id
  ),
  identifiedBy[] {
    ...,
    hasType[]-> {
      ...
    },
    language[]-> {
      ...
    }
  },
  activityStream[]{
    _type == 'reference' => @->{
      ...,
      contributionAssignedBy[]{
        ...,
        assignedActor->{
          _id,
          label,
          image{
            asset->
          }
        }
      }
    },
    ...,
    hasType[accessState == 'open']-> {
      ...
    },
    tookPlaceAt[]->,
    movedFrom->{
      _id,
      label,
      geoJSON
    },
    movedTo->{
      _id,
      label,
      geoJSON
    },
    contributionAssignedBy[]{
      ...,
      assignedActor->{
        _id,
        label,
        image{
          asset->
        }
      }
    },
    usedGeneralTechnique[]->{
      _id,
      label,
    },
    target->{
      _id,
      label,
      image{
        asset->
      }
    }
  },
  "excerpt": pt::text(referredToBy[0].body),
  referredToBy[] {
    ...,
    body[] {
      ...,
      _type == 'reference' => @->{
        _id,
        _type,
        preferredIdentifier,
        label,
        subjectOfManifest,
        image{
          ...,
          asset->
        }
      }
    },
    hasType[]-> {
      label,
    },
    creator{
      "_id": assignedActor->._id,
      "label": assignedActor->.label,
    },
    language-> {
      identifiedByISO6393,
      label,
    }
  },
  hasCurrentOwner[]-> {
    _id,
    label,
    image
  },
  subject[]-> {
    _id,
    label,
  },
  consistsOf[]-> {
    _id,
    label,
  },
  measurement[] {
    ...,
    observedDimension[] {
      ...,
      hasType->{
        label,
      },
      hasUnit->{
        label,
      },
    }
  }
`
