import React from 'react'
import { ReactiveBase } from '@appbaseio/reactivesearch'
import Filters from './components/Filters'
import Results from './components/Results'
// import Search from './components/Search'
import { Flex, Box } from '@sanity/ui'

export default function SearchSka() {
  const ska = 'https://jambo.uib.no/elasticsearch'

  return (
    <ReactiveBase app="ska2" url={ska}>
      <Box marginTop={5}>
        {/* <Search /> */}
        <Flex marginTop="5" paddingX={2} style={{ borderTop: '1px solid #ccc' }}>
          <Filters />
          <Results />
        </Flex>
      </Box>
    </ReactiveBase>
  )
}
