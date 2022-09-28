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
            title: 'UiB git repo',
            value: 'https://git.app.uib.no/uib-ub/spesialsamlingene/utstillinger/exhibition-decriminalizing-history-sanity-nextjs',
            category: 'Code',
          },
          {
            title: 'Github repo',
            value: 'https://github.com/uib-ub/exhibition-decriminalizing-history-sanity-nextjs',
            category: 'Code',
          },
          {
            title: 'Web',
            value: 'https://decriminalizing-history.uib.no',
            category: 'Links',
          },
          {
            title: 'Studio',
            value: 'https://decriminalizing-history.uib.no/studio',
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
