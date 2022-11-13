import dynamic from 'next/dynamic'
import Caption from './shared/Caption'

// const MiradorWithNoSSR = dynamic(() => import('../../IIIF/MiradorViewer'), { ssr: false })

export default function MiradorGallery(props) {
  return null
  /* if ((!props && !props.items) || props.disabled === true) {
    return null
  }
  const { title, description, items } = props
  const height = '60vh'

  return (
    <Grid
      ref={ref}
      minH={height}
      maxW={['xl', '4xl', '4xl', '6xl']}
      my={{ base: '6', md: '16', lg: '16', xl: '20' }}
      borderBottom={{ base: 'solid 1px', md: 'none' }}
      borderColor="gray.200"
      gridGap={[2, null, 5, null]}
      gridTemplateAreas={{ base: '"image" "metadata"', xl: '"image metadata"' }}
      gridTemplateColumns={{ base: 'auto', lg: '10fr 3fr' }}
      gridTemplateRows="1fr auto"
      mx="auto"
    >
      {items && inView && (
        <MiradorWithNoSSR gridArea="image" variant="standard" manifests={items} />
      )}
      {!items && <Flex gridArea="image">Mangler manifest</Flex>}

      {!inView && <Skeleton height="60vh" />}

      {inView && <Caption title={title} content={description} />}
    </Grid>
  ) */
}
