import React from "react";
import "../styles/globals.css";
import "../styles/globals.scss";

import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box
        bg="linear-gradient(to right, rgba(63,81,181,0.4), rgba(3, 169, 244, .4))"
        display="flex"
        flexDirection="column"
        minHeight="1080px"
      >
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
