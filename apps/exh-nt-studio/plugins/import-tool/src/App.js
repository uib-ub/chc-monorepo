import React from 'react'
import { HashRouter as Router, NavLink, Route } from 'react-router-dom'
import styles from './ImportTool.css'
import Header from './shared/components/Header'
import SearchNB from './nb'
import SearchMarcus from './marcus'
import SearchSka from './ska'
import SearchKN from './kulturnav'
import { Box, Flex } from '@sanity/ui'

const App = () => {
  return (
    <Router hashType="noslash">
      <Flex style={{ backgroundColor: 'white', display: 'flex', alignItems: 'stretch', flexDirection: 'column' }}>

        <Box paddingX={4}>
          <Header />
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/ska">
            Skeivt arkiv
          </NavLink>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/marcus">
            Marcus
          </NavLink>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/nb">
            NB Digitalt
          </NavLink>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/kulturnav">
            Kulturnav
          </NavLink>
        </Box>

        {/* Route components are rendered if the path prop matches the current URL */}
        <Route path="/ska">
          <SearchSka />
        </Route>

        <Route path="/marcus">
          <SearchMarcus />
        </Route>

        <Route path="/nb">
          <SearchNB />
        </Route>

        <Route path="/kulturnav">
          <SearchKN />
        </Route>
      </Flex>
    </Router>
  )
}

export default App
