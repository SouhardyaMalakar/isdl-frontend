import { useContext, useEffect } from "react";
import React from "react";
import AuthContext from "../context/AuthContext";
import {Text,Button, Image} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import  { Box } from "@chakra-ui/react"
function navbar() {
  const { User ,logout} = useContext(AuthContext);
  const router = useRouter ();

  if (User) {
    return (
      <Box  bg="#161a2b"  height = "80px" padding={"10px"} display ="flex" flexDirection={"row"} justifyContent={"space-between"} paddingRight= "50px" paddingLeft = "50px">
        <Box display="flex">
        <Image  marginRight = "50px" width="50px" height="50px" src="college.png"></Image>
        <Text fontSize={"40"}color="white" >Lecture Hall Booking </Text>
        </Box>
      <Button  border="2px solid black"  marginTop="10px" paddingTop = '5px'colorScheme={"orange"} onClick={logout} >LOGOUT</Button>
    </Box>
    );
  } else {
    return (
      <Box  bg="#003851"  height = "80px" padding={"10px"} display ="flex" flexDirection={"row"} justifyContent={"space-between"} paddingRight= "50px" paddingLeft = "50px">
        <Box display="flex">
        <Image  marginRight = "50px" width="50px" height="50px" src="college.png"></Image>
        <Text fontSize={"40"}color="white"  >Lecture Hall Booking </Text>
        </Box>
        <Button  border="2px solid black"  marginTop="10px" paddingTop = '5px' colorScheme={"green"} onClick={() => {router.push('/login')}}  >LOGIN</Button>
      </Box>
    );
  }
}

export default navbar;
