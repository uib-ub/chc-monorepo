export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req


  const query = `
    PREFIX dct: <http://purl.org/dc/terms/>

    ASK { 
      GRAPH ?g { 
        VALUES ?id { "${id}" }
        ?s  dct:identifier ?id .
      }
    }
`

  switch (method) {
    case 'GET':
      // Find service with ID
      try {
        const response = await Promise.allSettled([
          fetch(`${process.env.SKA_API}${query}`).then(res => res.json())
            .then(res => {
              if (res && res.boolean) {
                return {
                  name: 'skeivtarkiv',
                  url: process.env.SKA_API,
                }
              }
            })
            .catch(err => { return err }),
          fetch(`${process.env.MARCUS_API}${query}`).then(res => res.json())
            .then(res => {
              if (res && res.boolean) {
                return {
                  name: 'marcus',
                  url: process.env.MARCUS_API,
                }
              }
            })
            .catch(err => { return err }),
        ])
          .then(res => res.filter(Boolean)).then(res => res[0])
          .catch((err) => {
            // log that I have an error, return the entire array;
            console.log('A promise failed to resolve', err);
            res.status(503).json({ message: err })
          })


        if (response.status >= 200 && response.status <= 299) {
          res.status(200).json(response)
        }
        if (response.status >= 500 && response.status <= 599) {
          res.status(500).json({ message: "Error" })
        } else {
          res.status(404).json({ message: "ID not found in any services." })
        }
      } catch (err) {
        err => { console.log(err); return err }
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
