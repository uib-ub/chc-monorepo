import { extendTheme } from '@chakra-ui/react'

// Global style overrides
//import styles from './styles'

// Foundational style overrides
import borders from './foundations/borders'
import colors from './foundations/colors'
import textStyles from './foundations/textStyles'
import typography from './typography'
import radii from './foundations/radii'
import space from './foundations/space'

// Component style overrides
import Button from './components/button'

const overrides = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  borders,
  colors,
  radii,
  space,
  textStyles,
  typography,
  components: {
    Button,
  },
}

export default extendTheme(overrides)