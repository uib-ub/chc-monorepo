import React from 'react'
import { HashRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
import styles from './ImportTool.module.css'
import Header from './shared/components/Header'
import SearchNB from './nb'
import SearchMarcus from './marcus'
import SearchSka from './ska'
import SearchKN from './kulturnav'
import { Box, Flex } from '@sanity/ui'

const App = () => {
  return (
    <Router>
      <Flex style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'column', marginTop: '1em' }}>

        <Box paddingX={4}>
          <Header />
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/marcus" replace>
            Marcus
          </NavLink>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/ska" replace>
            Skeivt arkiv
          </NavLink>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/nb" replace>
            NB Digitalt
          </NavLink>
          <NavLink activeClassName={styles.active} className={styles.navlink} to="/kulturnav" replace>
            Kulturnav
          </NavLink>
        </Box>

        {/* Route components are rendered if the path prop matches the current URL */}
        <Switch>

          <Route path="/ska">
            <SearchSka />
          </Route>

          <Route path="/nb">
            <SearchNB />
          </Route>

          <Route path="/kulturnav">
            <SearchKN />
          </Route>

          <Route exact path="/marcus">
            <SearchMarcus />
          </Route>

          <Route exact path="/">
            <SearchMarcus />
          </Route>
        </Switch>
      </Flex>
    </Router>
  )
}

export default App
