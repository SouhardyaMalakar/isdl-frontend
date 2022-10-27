import { useContext, useEffect } from "react";
import React from "react";
import AuthContext from "../context/AuthContext";
import {Text,Button} from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { useRouter } from 'next/router'
import  { Box } from "@chakra-ui/react"




function navbar() {
  const { User ,logout} = useContext(AuthContext);
  const router = useRouter ();

  if (User) {
    return (
      <Box bg="#58a6e3" height = "80px" padding={"10px"} display ="flex" flexDirection={"row"} justifyContent={"space-between"} paddingRight= "50px" paddingLeft = "50px">
      <Text fontSize={"30"} paddingTop = '10px'>Lecture Hall Booking </Text>
      <Button marginTop="10px" paddingTop = '5px' colorScheme={"green"} colorScheme={"orange"} onClick={logout} >LOGOUT</Button>
    </Box>
    );
  } else {
    return (
      <Box bg="#58a6e3" height = "80px" padding={"10px"} display ="flex" flexDirection={"row"} justifyContent={"space-between"} paddingRight= "50px" paddingLeft = "50px">
        <Text fontSize={"30"} paddingTop = '10px'>Lecture Hall Booking </Text>
        <Button marginTop="10px" paddingTop = '5px' colorScheme={"green"} onClick={() => {router.push('/login')}}  >LOGIN</Button>
      </Box>
    );
  }
}

export default navbar;
