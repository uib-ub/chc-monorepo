import { nanoid } from 'nanoid'
// import { parse } from 'date-fns'
import { mapLicenses } from './mapLicenses'
import { mapOwner } from './mapOwner'
import { mapTypes } from './mapTypes'
import { getTimespan } from './getTimespan'
import { convertToBlock } from './htmlUtils'
import Schema from '@sanity/schema'

const def = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'blogPost',
      fields: [
        {
          title: 'Title',
          type: 'string',
          name: 'title'
        },
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [
            {
              title: 'Block',
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'Quote', value: 'blockquote' },
              ],
              lists: [
                { title: 'Numbered', value: 'number' },
                { title: 'Bulleted', value: 'bullet' },
              ],
              marks: {
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'External link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                        validation: Rule => Rule.uri({
                          scheme: ['http', 'https', 'mailto', 'tel']
                        })
                      },
                      {
                        title: 'Open in new tab',
                        name: 'blank',
                        description: 'Read https://css-tricks.com/use-target_blank/',
                        type: 'boolean',
                        initialValue: true
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }
      ]
    }
  ]
})

const nomalizedLabel = (dirtyLabel) => {
  // If we only get a string, assume that it is in norwegian
  if (typeof dirtyLabel === 'string') {
    return {
      _type: 'LocalizedString',
      no: dirtyLabel,
      en: dirtyLabel
    }
  }
  // If it is an array, we have multiple labels. It could be two strings and then 
  // we assume they are in norwegian. If we get objects we need to map the language.
  // We could get an array with both strings and objects :-(!!!!
  if (Array.isArray(dirtyLabel)) {
    const labels = {
      _type: 'LocalizedString',
    }
    dirtyLabel.map((i) => {
      if (i && typeof i === 'object') {
        Object.assign(labels, { [i['@language']]: i.value })
      }
      if (i && typeof i === 'string') {
        Object.assign(labels, { no: i })
      }
    })
    return labels
  }
}

const blockContentType = def.get('blogPost')
  .fields.find(field => field.name === 'body').type

export default function getDocument(item, assetID) {
  // Map type to Sanity types
  const types = mapTypes(Array.isArray(item.type) ? item.type : [item.type])

  // Handle description RDF to Sanity Portable Text
  const descriptions = item.description ? Array.isArray(item.description) ? item.description : [item.description] : null
  // const descriptionBlocks = descriptions.map(description => convertToBlock(blockContentType, description, true))

  // Get the EDTF object
  const date = getTimespan(item.created?.value, item.madeAfter?.value, item.madeBefore?.value)

  const subject = item.subject
    ? [
      ...item.subject.map((s) => {
        return {
          _type: 'Concept',
          _id: s.identifier,
          _rev: nanoid(),
          accessState: 'open',
          editorialState: 'published',
          label: nomalizedLabel(s.prefLabel),
        }
      }),
    ]
    : []

  const maker = item.maker
    ? [
      ...item.maker.map((s) => {
        return {
          _type: 'Actor',
          _id: s.identifier,
          _rev: nanoid(),
          accessState: 'open',
          editorialState: 'published',
          label: {
            _type: "LocalizedString",
            no: Array.isArray(s.name) === false ? s.name : s.name[0]
          },
        }
      }),
    ]
    : []

  const depicts = item.depicts
    ? [
      ...item.depicts.map((s) => {
        return {
          _type: 'Actor',
          _id: s.identifier,
          _rev: nanoid(),
          accessState: 'open',
          editorialState: 'published',
          label: {
            _type: "LocalizedString",
            no: Array.isArray(s.name) === false ? s.name : s.name[0]
          },
        }
      }),
    ]
    : []

  const activityStream = [
    {
      _key: nanoid(),
      _type: 'BeginningOfExistence',
      ...(item.maker && {
        contributionAssignedBy: [
          ...item.maker.map((s) => {
            return {
              _key: nanoid(),
              _type: 'ContributionAssignment',
              assignedActor: {
                _ref: s.identifier,
                _type: 'reference',
              },
            }
          }),
        ],
      }),
      ...(date && {
        timespan: {
          _key: nanoid(),
          _type: 'Timespan',
          ...date,
          /* edtf: item.created.value,
          ...(item.madeAfter?.value ? { beginOfTheBegin: item.madeAfter?.value } : ''),
          ...(item.madeBefore?.value ? { endOfTheEnd: item.madeBefore?.value } : ''),
          ...(item.created?.value ? { date: parseDate(item.created?.value) } : ''), */
        },
      }),
    },
  ]

  const doc = {
    subject,
    maker,
    depicts,
    doc: {
      _type: 'HumanMadeObject',
      _id: `${item.identifier}`,
      accessState: 'open',
      editorialState: 'published',
      label: nomalizedLabel(item.title),
      preferredIdentifier: item.identifier,
      homepage: item.homepage.id,
      subjectOfManifest: `https://api-ub.vercel.app/v1/items/${item.identifier}/manifest`,
      identifiedBy: [
        {
          _type: 'Identifier',
          _key: nanoid(),
          content: item.identifier,
          hasType: {
            _type: 'reference',
            _key: nanoid(),
            _ref: '3f3e8a7a-d09d-46d4-8dff-7fa5fbff1340',
          },
        },
      ],
      license: mapLicenses(item.license),
      ...(assetID && {
        image: {
          _type: 'DigitalObjectImage',
          asset: {
            _type: 'reference',
            _ref: assetID,
          },
        }
      }),
      ...(Object.keys(activityStream[0]).length > 2 && {
        activityStream,
      }),
      ...(descriptions && descriptions.length > 0 && {
        referredToBy: [
          ...descriptions.map(block => ({
            _key: nanoid(),
            _type: 'LinguisticObject',
            accessState: 'open',
            editorialState: 'published',
            body: block,
            hasType: [
              {
                _key: nanoid(),
                _ref: 'd4b31289-91f4-484d-a905-b3fb0970413c',
                _type: 'reference',
              },
            ],
          })),
        ],
      }),
      ...(item.subject && {
        subject: [
          ...item.subject.map((s) => {
            return {
              _type: 'reference',
              _key: nanoid(),
              _ref: s.identifier,
            }
          }),
        ],
      }),
      ...(item.depicts && {
        depicts: [
          ...item.depicts.map((s) => {
            return {
              _type: 'reference',
              _key: nanoid(),
              _ref: s.identifier,
            }
          }),
        ],
      }),
      hasCurrentOwner: mapOwner(item.identifier),
      ...(types.length > 0 && { hasType: types }),
      wasOutputOf: {
        _type: 'DataTransferEvent',
        _key: nanoid(),
        /* _id: nanoid(36), <- Insert if this is to be changed to a reference */
        transferred: {
          _type: 'DigitalObject',
          _key: nanoid(),
          /* _id: item.id, */
          value: `"${JSON.stringify(item, null, 0)}"`,
        },
        timestamp: new Date(),
        hasSender: {
          _type: 'DigitalDevice',
          _key: nanoid(),
          /* _id: nanoid(36), */
          label: 'sparql.ub.uib.no',
        },
      },
    },
  }

  return doc
}
