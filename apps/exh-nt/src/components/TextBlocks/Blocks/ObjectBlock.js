import dynamic from 'next/dynamic'
import Image from 'next/image'
import { GetImage } from '../../../../../../apps/exh-nt/src/lib/sanity.server'
import { Link } from '../../../components/Link'
import { TextBlocks } from '..'
import Source from './shared/Source'
import { useRouter } from 'next/router'

/* const MiradorWithNoSSR = dynamic(() => import('../../IIIF/MiradorViewer'), {
  ssr: false,
}) */

const FigCaption = ({ children, label, description, item }) => {
  return (
    <figcaption>
      {label && (
        <h2 className='font-weight-700 text-2xl'>
          {label}
        </h2>
      )}

      {description && (
        <div mb={4}>
          <TextBlocks
            value={description}
          />
        </div>
      )}

      {item && <Source {...item} />}

      {children}
    </figcaption>
  )
}

const ObjectBlock = (props) => {
  const { locale, defaultLocale } = useRouter()

  if (!props || props.disabled === true) {
    return null
  }

  const { _key, label, description, item, source, variant } = props
  const height = 'clamp(40em, 50vh, 20em)'

  if (variant === 'static-individual-captions') {
    return (
      <div key={_key} className='flex gap-5 align-baseline justify-evenly flex-wrap'>
        {item.map((i) => (
          <div
            key={i._key}
            as='figure'
            flex={{ base: '0 0 100%', md: '0 0 30%' }}
          >
            {!i.internalRef && (
              <Image
                {...GetImage(i.image)}
                objectFit={'contain'}
                alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
              />
            )}
            {i.internalRef && (
              <Link
                key={i._key}
                ariaLabelledBy={i._key}
                href={`/id/${i.internalRef._ref}`}
              >
                <Image
                  id={i._key}
                  {...GetImage(i.image)}
                  objectFit={'contain'}
                  alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                />
              </Link>
            )}

            <FigCaption label={i.label} description={i.description} item={[i]}>
              <div
                fontSize={{ base: 'md', sm: 'md', md: 'md', xl: 'lg' }}
                pb={{ base: '2', md: '0' }}
                mx='auto'
                mt={2}
                mb={0}
                maxW={'full'}
              >
                <TextBlocks
                  value={i.source}
                />
              </div>
            </FigCaption>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'static-compare') {
    return (
      <figure
        key={item._key}
        variant={variant}
        w='full'
      >
        {item?.length === 0 && <div className='flex'>Missing figures or not exactly two figures!</div>}

        {item.length === 2 && (
          <div className='relative'>
            <div className='flex align-baseline justify-evenly'>
              {item.map((i) => (
                <figure key={i._key} className='relative max-h-70vh'>
                  {i.image && (
                    <Image
                      key={i._key}
                      {...GetImage(i.image)}
                      objectFit={'contain'}
                      alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                    />
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}

        <FigCaption label={label} description={description} source={source}>
          <div className='hidden md:block'>
            <TextBlocks
              value={source}
            />
          </div>
        </FigCaption>
      </figure>
    )
  }

  return (
    <figure key={item._key}>
      {item?.length === 0 && <div className='flex'>Missing figure</div>}

      {item && (
        <div className='relative'>
          {/* {variant === 'mirador' && (
            <MiradorWithNoSSR gridArea="image" variant="basic" manifests={item} height={height} />
          )} */}

          {variant === 'static' && (
            <div className='flex flex-wrap gap-5align-baseline justify-evenly'>
              {item.length > 1 && item.map((i) => (
                <div key={i._key} className='flex'>
                  {!i.internalRef && (
                    <Image
                      key={i._key}
                      {...GetImage(i.image)}
                      sizes='80vh'
                      style={{ objectFit: 'contain', maxWidth: 'auto', maxHeight: '80vh' }}
                      alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                    />
                  )}
                  {i.internalRef && (
                    <Link
                      key={i._key}
                      ariaLabelledBy={i._key}
                      href={`/id/${i.internalRef._ref}`}
                    >
                      <Image
                        key={i._key}
                        {...GetImage(i.image)}
                        sizes='80vh'
                        style={{ objectFit: 'contain', maxWidth: 'auto', maxHeight: '80vh' }}
                        alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                      />
                    </Link>
                  )}
                </div>
              ))}

              {item.length === 1 && item.map((i) => (
                <>
                  {!i.internalRef && (
                    <Image
                      key={i._key}
                      {...GetImage(i.image)}
                      sizes='80vh'
                      style={{ objectFit: 'contain', maxWidth: 'auto', maxHeight: '80vh' }}
                      alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                    />
                  )}
                  {i.internalRef && (
                    <Link
                      key={i._key}
                      ariaLabelledBy={i._key}
                      href={`/id/${i.internalRef._ref}`}
                    >
                      <Image
                        key={i._key}
                        {...GetImage(i.image)}
                        sizes='80vh'
                        style={{ objectFit: 'contain', maxWidth: 'auto', maxHeight: '80vh' }}
                        alt={i.image?.alt?.[locale ?? defaultLocale] ?? ''}
                      />
                    </Link>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      )}

      <FigCaption label={label} description={description}>
        {item && item.filter(i => i.objectDescription).map((item, i) => (
          <div key={item.objectDescription?._id}>
            <p>
              <i>
                <Link href={`/id/${item.objectDescription?._id}`} color='unset' isExternal>
                  {item.objectDescription?.label[locale] || item.objectDescription?.label[defaultLocale] || 'Missing default language label'}
                </Link>
              </i>

              {item.objectDescription?.hasCurrentOwner?.length && `. ${item.objectDescription?.hasCurrentOwner[0].label[locale] ?? item.objectMetadata?.hasCurrentOwner[0].label[defaultLocale]}.`}
            </p>
          </div>
        ))}

        <div>
          <TextBlocks
            value={source}
          />
        </div>
      </FigCaption>

    </figure>
  )
}

export default ObjectBlock
