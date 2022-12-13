import { SwatchIcon } from '@heroicons/react/24/outline'

export const Palette = ({ colors }: any) => {
  if (!colors) return null

  let palette: any = []
  // TODO: clean up component, not elegant
  delete colors._type

  if (colors) {
    Object.values(colors).forEach((color: any) => {
      palette.push(color.background)
    })
  }

  return (
    <div>
      <div className='flex gap-1 items-center text-xs font-light dark:text-gray-300 text-gray-700 mb-1'>
        <SwatchIcon className='w-3 h-3' />
        Colour palette
      </div>
      <div className='grid grid-cols-7'>
        {palette.map((color: string, index: number) => (
          <div key={`${index}-${color}`} className={`h-1`} style={{ backgroundColor: color }}></div>
        ))}
      </div>
    </div>
  )
}