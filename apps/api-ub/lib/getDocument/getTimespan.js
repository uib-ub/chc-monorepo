import { mapEDTF } from './mapEDTF'
import edtf from 'edtf'

export const getTimespan = (date, after, before) => {
  if (!date && !after && !before) return undefined

  if (date) {
    const e = edtf(date.value, { types: ['Year', 'Date', 'Interval', 'Season'] })
    return mapEDTF(e)
  }
  if (after?.value === before?.value) {
    const e = edtf(before?.value, { types: ['Year', 'Date', 'Interval', 'Season'] })
    return mapEDTF(e)
  }
  if (after && !before) {
    const e = edtf(`${after.value}/`, { types: ['Year', 'Date', 'Interval', 'Season'] })
    return mapEDTF(e)
  }
  if (!after && before) {
    const e = edtf(`/${before.value}`, { types: ['Year', 'Date', 'Interval', 'Season'] })
    return mapEDTF(e)
  }
  if (after && before) {
    const e = edtf(`${after.value}/${before.value}`, { types: ['Year', 'Date', 'Interval', 'Season'] })
    return mapEDTF(e)
  }
  return null
}