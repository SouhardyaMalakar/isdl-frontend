import React from 'react'
import "../styles/globals.css"
import "../styles/globals.scss"

import { ChakraProvider } from '@chakra-ui/react'
import {Box} from '@chakra-ui/react'
import {AuthProvider} from "../context/AuthContext"
import Navbar from "../components/navbar"


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box display='flex' flexDirection="column" height="100% !important" >
        <AuthProvider>
          <Navbar/>
          <Component {...pageProps} />
        </AuthProvider>
      </Box>
   </ChakraProvider>
  )
}

export default MyApp