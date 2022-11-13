import Image from 'next/image'
import { GetImage } from '../../../../../../../apps/exh-nt/src/lib/sanity.server'

export default function IllustrationWithCaption(props) {
  const bg = useColorModeValue('blackAlpha.100', 'black')

  if ((!props && !props.illustration) || props.disabled === true) {
    return null
  }

  const { image } = props

  return (
    <div>
      {image ? (
        <div className='relative min-h-50vh'>
          {image && (
            <Image
              alt=""
              {...GetImage(image)}
              layout="fill"
              objectFit={'contain'}
            />
          )}
        </div>
      ) : (
        <div className='flex'>Mangler illustrasjon</div>
      )}
    </div>
  )
}
