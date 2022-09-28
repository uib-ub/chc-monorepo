import {nanoid} from 'nanoid'
import {startsWith} from "lodash"

export const mapOwner = (id) => {
  if(startsWith(id, 'ubm')) {
    return [{
        _type: 'reference',
        _key: nanoid(),
        _ref: 'bc3cf5de-5879-4b2b-b9a5-8037ca61a1ee',
      }]
  } else {
    return [{
        _type: 'reference',
        _key: nanoid(),
        _ref: '782c5364-7324-4f16-b5af-2c60b73fc707',
      }]
  }
}
