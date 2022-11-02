import { getResolverQuery } from '../queries/getResolverQuery'

export const checkForIDInServices = async (id) => {
  const query = getResolverQuery(id)

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

  return response
}