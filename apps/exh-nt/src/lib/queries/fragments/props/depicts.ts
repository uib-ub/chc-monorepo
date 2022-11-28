import { groq } from 'next-sanity'

export const depicts = groq`
depicts[]-> {
  _id,
  label,
  image,
  definedBy,
}
`