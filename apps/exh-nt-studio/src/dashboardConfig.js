export default {
  widgets: [
    {
      name: 'project-users',
      layout: {
        height: 'auto'
      }
    },
    {
      name: 'project-info',
      layout: {
        height: 'auto',
        width: 'small'
      },
      options: {
        data: [
          {
            title: 'Github repo',
            value: 'https://github.com/uib-ub/chc-monorepo/tree/main/apps/exh-nt',
            category: 'Code',
          },
          {
            title: 'Web',
            value: 'https://neverending-and-temporary.vercel.app',
            category: 'Links',
          },
          {
            title: 'Studio',
            value: 'https://neverending-and-temporary.vercel.app/studio',
            category: 'Links',
          },
        ],
      },
    },
    {
      name: 'document-list',
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 10
      },
      layout: { width: 'small' },
    },
  ],
}
