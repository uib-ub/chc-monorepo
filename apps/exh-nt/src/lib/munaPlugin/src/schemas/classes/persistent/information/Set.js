import { defineType } from 'sanity'
import { hasMember } from '../../../properties/object'

export default defineType({
  name: 'Set',
  type: 'object',
  title: 'Sett',
  titleEN: 'Set',
  description:
    'Brukes til å samle objekter i et sett, der settet er knyttet til for eksempel en samling.',
  fields: [
    hasMember
  ],
})
