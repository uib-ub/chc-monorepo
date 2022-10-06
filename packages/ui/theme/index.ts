import { extendTheme } from '@chakra-ui/react'

// Global style overrides
//import styles from './styles'

// Foundational style overrides
import borders from './foundations/borders'
import colors from './foundations/colors'

// Component style overrides
import Button from './components/button'

const overrides = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  borders,
  colors,
  // Other foundational style overrides go here
  components: {
    Button,
    // Other components go here
  },
}

export default extendTheme(overrides)