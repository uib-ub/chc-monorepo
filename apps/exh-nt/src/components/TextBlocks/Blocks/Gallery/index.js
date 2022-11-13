import { Container, Flex, Icon } from '@chakra-ui/react'
import ItemView from './ItemView'
import { BsArrowRight } from 'react-icons/bs'

export default function Gallery(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const { items } = props

  return (
    <Container
      display="grid"
      bg="blackAlpha.100"
      maxW={['100%', 'lg', '100vw', null, null]}
      px="0"
      my="10"
    >
      <Icon
        as={BsArrowRight}
        position="absolute"
        right="3"
        w={8}
        h={8}
        mt="2"
        color="red.600"
        display={['none', null, 'block', null]}
      />
      <Flex
        px={[4, 0, 12, null]}
        py="12"
        mx="0"
        overflowX="scroll"
        direction={{ base: 'column', md: 'row' }}
        boxSizing="content-box"
      >
        {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
        {items && items.map((i) => <ItemView key={i._key} {...i} />)}
      </Flex>
    </Container>
  )
}
