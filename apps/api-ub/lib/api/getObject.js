const { getItemManifestQuery } = require('../queries/getItemManifestQuery')

export async function getObject(api, id) {
  if (!id) return error

  const query = getItemManifestQuery(id, process.env.MANIFEST_BASE)
  const result = await fetch(`${api}${encodeURIComponent(query)}&output=json`)

  return result
}