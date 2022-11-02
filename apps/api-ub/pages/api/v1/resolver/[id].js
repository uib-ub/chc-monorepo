import { getResolverQuery } from '../../../../lib/queries/getResolverQuery'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const query = getResolverQuery(id)

  switch (method) {
    case 'GET':
      // Find service with ID
      try {
        const response = await Promise.all([
          fetch(`${process.env.SKA_API}${query}`).then(res => res.json()).then(res => {
            if (res.boolean) {
              return {
                name: 'skeivtarkiv',
                url: process.env.SKA_API,
              }
            }
          }),
          fetch(`${process.env.MARCUS_API}${query}`).then(res => res.json()).then(res => {
            if (res.boolean) {
              return {
                name: 'marcus',
                url: process.env.MARCUS_API,
              }
            }
          })
        ]).then(res => res.filter(Boolean)).then(res => res[0])

        if (response) {
          res.status(200).json(response)
        } else {
          res.status(404).json({ message: "ID not found in any services." })
        }
      } catch (err) {
        err => { return err }
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
