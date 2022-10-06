import { Button, Box, Flex, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Never-ending and temporary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        bgImage="url('https://data.ub.uib.no/files/bs/ubb/ubb-jg/ubb-jg-k/ubb-jg-k-0276/jpg/ubb-jg-k-0276_md.jpg')"
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
      >

        <Flex
          as='main'
          minHeight='100vh'
          py={4}
          px={4}
          flex='1'
          display='flex'
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Heading
            as='h1'
            size={'4xl'}
          >
            Never-ending and temporary
          </Heading>

          <Text
            fontSize={'2xl'}
          >
            New exhibition by the University of Bergen Special collections, coming in the beginning of 2023.
          </Text>
        </Flex>


        <Flex
          as='footer'
          py='2rem'
          flex='1'
          display='flex'
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Button variant={'outline'}>
            <a href={`${process.env.NEXT_PUBLIC_STUDIO_URL}/studio`} target='_blank' rel='noreferrer'>Studio</a>
          </Button>
        </Flex>
      </Box>
    </div >
  )
}

export default Home
